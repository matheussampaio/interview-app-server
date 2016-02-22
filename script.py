import urllib
import urllib2

url = "http://jipa-server.herokuapp.com/api/question"
# url = "http://localhost:3000/api/question"

dados = open("data.tsv").read().split("\n")

countAdd = 0;

for line in dados[1:]:
    row = line.split("\t")

    question = row[1]
    answer = row[2]

    params = urllib.urlencode({
      "question": question,
      "answer": answer
    })

    try:
        response = urllib2.urlopen(url, params).read()

        print response
    except urllib2.HTTPError as err:
        print 'Error: {0}: {1}'.format(err, err.strerror)
