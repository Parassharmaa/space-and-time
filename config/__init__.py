import sys
import os
from .env import env

def load_config():
    current_dir = os.path.abspath('./')

    os.environ.update({
        "ROOT_PATH": current_dir
    })

    os.environ['secret_key'] = env['secret_key']
    os.environ['mongo_db'] = env['mongo_db']

    sys.path.append(os.path.join(os.environ.get('ROOT_PATH'), 'modules'))
    sys.path.append(os.path.join(os.environ.get('ROOT_PATH'), 'resources'))


load_config()
