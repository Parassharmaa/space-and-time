import sys
import os


def load_config():
    current_dir = os.path.abspath('./')

    os.environ.update({"ROOT_PATH": current_dir})

    sys.path.append(os.path.join(os.environ.get('ROOT_PATH'), 'modules'))
    sys.path.append(os.path.join(os.environ.get('ROOT_PATH'), 'resources'))


load_config()
