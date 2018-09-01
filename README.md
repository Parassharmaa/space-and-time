# Space and Time

Visualizing geography with time.
[APP URL](https://space-n-time.herokuapp.com)

## Features
* Plots data (polygon/marker) to the corresponding time
* Events (Add/Edit)
* User contributions on events.
* Review contribution before publishing. (Admin Login)


### Requirements
* Node 8.0 or up
* yarn 1.7.0 or up
* Python 3.6 and up
* pipenv



## Installation

#### Cloning

``` bash
$ git clone git@github.com:Parassharmaa/space-and-time.git

$ cd space-and-time
```

#### Environment Variables
    * mongo_db = <connection_string>
    * secret_key = <secret_key>

#### Frontend
``` bash
$ yarn install
$ yarn run build

```

#### Backend
``` bash
$ pipenv shell 
$ pipenv install
$ python3 api.py
```

## Contact

* mail2paras.s@gmail.com