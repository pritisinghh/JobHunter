import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string


def punctuation_removal(data_string):
    punctuations = string.punctuation
    for punc in punctuations:
        data_string = data_string.replace(punc, "")
    return data_string


def duplicateWords(words):
    word_tokens_original = words
    ordered_tokens = set()
    word_tokens = []
    for word in word_tokens_original:
        if word not in ordered_tokens:
            ordered_tokens.add(word)
            word_tokens.append(word)
    return word_tokens


def remove_stopWords(words):
    stop_words = set(stopwords.words("english"))
    filtered_words = []
    for w in words:
        if w not in stop_words:
            filtered_words.append(w)
    return filtered_words


def remove_html_mails(email_text):
    word_tokens = word_tokenize(email_text)
    for w in word_tokens:
        if w == "DOCTYPE":
            email_text = ""
            break
    return email_text


def preprocess(email_text, user_info):
    email_text = re.sub(r"https?://\S+", "", email_text, flags=re.MULTILINE)
    email_text = email_text.replace("<", "")
    email_text = punctuation_removal(email_text)
    email_text = remove_html_mails(email_text)
    words = word_tokenize(email_text)
    words = remove_stopWords(words)
    words = duplicateWords(words)
    for w in words:
        email_text = " ".join([email_text, w])
    email_text = email_text.replace(user_info["firstName"], "").replace(
        user_info["lastName"], ""
    )
    junk_list = ["Hi", "Hello", "Dear", "LinkedIn", "Twitter", "Glassdoor"]
    for i in junk_list:
        email_text = email_text.replace(i, "")

    return email_text
