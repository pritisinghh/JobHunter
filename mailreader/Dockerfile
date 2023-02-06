FROM python:3.9-buster

ENV MAILREADER_PORT 8000

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE $MAILREADER_PORT

CMD ["python3", "mailreader.py"]