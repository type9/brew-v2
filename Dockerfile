FROM python:alpine3.7 

# Author
MAINTAINER Gabriel Lee "gabespersonal@gmail.com"

ARG COCKTAILDB_API_KEY="9973533"

COPY /flaskserver /flaskserver
WORKDIR /flaskserver
RUN pip install -r requirements.txt 
EXPOSE 5000
ENV COCKTAILDB_API_KEY=$COCKTAILDB_API_KEY
ENTRYPOINT [ "python" ] 
CMD [ "app.py" ]