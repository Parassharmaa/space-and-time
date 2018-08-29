import json

def wrap_data(data):
    return json.loads(data.to_json())
