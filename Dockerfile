FROM ubuntu:latest
WORKDIR /app
RUN apt-get update -y && apt upgrade -y
RUN apt-get install -y software-properties-common python3-pip python3-dev build-essential hdf5-tools libgl1 libgtk2.0-dev
RUN apt-get -y install libgeos-dev
COPY . /app
RUN pip3 install -r requirements.txt
EXPOSE 8080
CMD ["python3", "run.py"]
