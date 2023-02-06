import logging
import os
from stanfordcorenlp import StanfordCoreNLP
import csv
import preprocess
import job_status
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from copy import deepcopy


def predict_status(title):
    df = pd.read_csv("training_dataset.csv", encoding="latin-1")
    vectorizer = CountVectorizer()
    x = vectorizer.fit_transform(df["email"])
    encoder = LabelEncoder()
    y = encoder.fit_transform(df["status"])
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
    nb = MultinomialNB(alpha=0.001)
    nb.fit(
        x_train,
        y_train,
    )
    category_names = {
        "Reject": job_status.job_status.NO_OFFER.value,
        "Applied": job_status.job_status.APPLIED.value,
        "Interview": job_status.job_status.INTERVIEW.value,
        "Offer": job_status.job_status.OFFER.value,
    }
    cod = nb.predict(vectorizer.transform([title]))

    return category_names[encoder.inverse_transform(cod)[0]]


class StanfordNLP:
    def __init__(
        self,
        host=f'http://{os.getenv("CORENLP_SERVICE_NAME")}',
        port=int(os.getenv("CORENLP_PORT")),
    ):
        try:
            self.nlp = StanfordCoreNLP(
                host, port=port, timeout=30000, logging_level=logging.DEBUG, quiet=False
            )  # , quiet=False, logging_level=logging.DEBUG)
            self.props = {
                "annotators": "tokenize,ssplit,pos,lemma,ner,parse,depparse,dcoref,relation",
                "pipelineLanguage": "en",
                "outputFormat": "json",
            }
        except Exception as err:
            print(err)
            return

    def ner(self, sentence):
        return self.nlp.ner(sentence)


def remove_duplicates(s):
    words = s.split(" ")
    unique = []

    for word in words:
        if word.lower() not in unique:
            unique.append(word.lower())

    return " ".join(unique)


def do_ner(mails):
    sNLP = StanfordNLP()
    all_mails = mails["mails"]
    user_info = deepcopy(mails)
    del user_info["mails"]

    ner_data = []
    for m in all_mails:

        if len(m) != 0:
            m = preprocess.preprocess(m, user_info)
            m = m.lower()
            output = sNLP.ner(m)
            # print(output, "\n\n")
            org = ""
            role = ""
            for i in range(0, len(output)):
                if output[i][1] == "ORGANIZATION":
                    org = " ".join([org, output[i][0]])
                if output[i][1] == "TITLE":
                    role = " ".join([role, output[i][0]])
            if len(org) == 0:
                words = m.split(" ")
                limit = 0
                org = " "
                while limit != 4:
                    for i in range(0, len(words)):
                        output = words[i - limit : i + 1]
                        org_tofind = " ".join(output)
                        with open("companies.csv", "r") as file:
                            reader = csv.reader(file)
                            for row in reader:
                                str_match = row[0].lower()
                                str_match = str_match.replace('"', "")
                                if str_match != "end":
                                    if str_match == org_tofind:
                                        org = org_tofind
                                        break
                    limit += 1
            if len(role) == 0:
                words = m.split(" ")
                limit = 0
                role = " "
                while limit != 4:
                    for i in range(0, len(words)):
                        output = words[i - limit : i + 1]
                        org_tofind = " ".join(output)
                        with open("title.csv", "r") as file:
                            reader = csv.reader(file)
                            for row in reader:
                                str_match = row[0].lower()
                                str_match = str_match.replace('"', "")
                                if str_match != "end":
                                    if str_match == org_tofind:
                                        org = org_tofind
                                        break
                    limit += 1

            label = predict_status(m)

            ner_dict = {
                "status": label,
                "role": remove_duplicates(role),
                "companyName": remove_duplicates(org),
            }

            ner_data.append(ner_dict)

    return ner_data
