from flask import Flask, request, jsonify
import pandas as pd
import re
from pyevmasm import disassemble_hex
from tensorflow.keras.models import model_from_json
from keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


app = Flask(__name__)


def disassembler(bytecode):
    disassembled_data=disassemble_hex(bytecode)
    li = []
    add_search = disassembled_data.split()
    for val in add_search:
        addresses = re.search("^0x[a-fA-F0-9]{40}$",val)
        if addresses:
            li.append(addresses.group())
    return [disassembled_data,li]


def predformatdata(bytecode):
    MAX_WORDS = 41000
    SEQ_LEN = 250

    tokenizer = Tokenizer(num_words=MAX_WORDS,lower=True)
    tokenizer.fit_on_texts(bytecode)
    word_index = tokenizer.word_index
    print('Found %s unique tokens.' % len(word_index))

    X = tokenizer.texts_to_sequences(bytecode)
    X = pad_sequences(X, maxlen=SEQ_LEN)
    print('Shape of data tensor:', X.shape)
    
    return X


@app.route('/', methods=['POST'])
def predict():
    content = request.get_json()
    assembly_data , addresses = disassembler(content['bytecode'])
    assembly_data = assembly_data.replace('\n',' ')
    
    # load json and create model
    json_file = open('upd_model/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("upd_model/model.h5")
    print("Loaded model from disk")

    x = predformatdata(assembly_data)
    a= loaded_model.predict([x])
    resDf = pd.DataFrame(a)
    predRes = resDf.mean(axis=0).to_list()
    data={
        "assembly_code":assembly_data,
        "addresses_found":addresses,
        "predRes": predRes
    }
    return jsonify(data)




app.run("localhost","8000",debug=True)


