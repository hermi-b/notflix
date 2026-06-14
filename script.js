from flask import Flask, request, render_template
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import logging
logging.basicConfig(level=logging.DEBUG)

print("we startin off STRONGGG")

app = Flask(__name__)

# Load the NLP model and TF-IDF vectorizer
filename = 'nlp_model.pkl'
clf = pickle.load(open(filename, 'rb'))
vectorizer = pickle.load(open('transform.pkl', 'rb'))

# Function to create the similarity matrix
def create_similarity():
    data = pd.read_csv('main_data.csv')
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(data['comb'])
    similarity = cosine_similarity(count_matrix)
    return data, similarity

# Load similarity data at startup
data, similarity = create_similarity()

# Movie Recommendation Function
def rcmd(movie_title):
    movie_title = movie_title.lower()
    
    if movie_title not in data['movie_title'].unique():
        return ["Sorry! The movie is not in our database. Try another one."]

    else:
        movie_index = data.loc[data['movie_title'] == movie_title].index[0]
        lst = list(enumerate(similarity[movie_index]))
        lst = sorted(lst, key=lambda x: x[1], reverse=True)
        lst = lst[1:11]  # Exclude the first item (itself)

        recommendations = [data['movie_title'][i[0]] for i in lst]
        return recommendations

@app.route("/", methods=["GET", "POST"])
def home():
    print("homeroute accessed", flush = True)

    recommendations = []
    if request.method == "POST":
        movie_title = request.form["movie"]
        print("movie_title", movie_title, flush = True)
        recommendations = rcmd(movie_title)
        print("recs", recommendations, flush = True)
        #Passes recs to index html so it can display it
    return render_template("index.html", recommendations=recommendations)

#app.route("/")

if __name__ == "__main__":
    print("Starting Flask app...", flush=True)
    app.run(debug=True, port = 5000)
