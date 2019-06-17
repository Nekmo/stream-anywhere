###############
Stream Anywhere
###############

.. image:: https://img.shields.io/travis/Nekmo/stream-anywhere
.svg?style=flat-square&maxAge=2592000
  :target: https://travis-ci.org/Nekmo/stream-anywhere
  :alt: Latest Travis CI build status

.. image:: https://img.shields.io/pypi/v/stream-anywhere.svg?style=flat-square
  :target: https://pypi.org/project/stream-anywhere/
  :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/pyversions/stream-anywhere.svg?style=flat-square
  :target: https://pypi.org/project/stream-anywhere/
  :alt: Python versions

.. image:: https://img.shields.io/codeclimate/maintainability/Nekmo/stream-anywhere.svg?style=flat-square
  :target: https://codeclimate.com/github/Nekmo/stream-anywhere
  :alt: Code Climate

.. image:: https://img.shields.io/codecov/c/github/Nekmo/stream-anywhere/master.svg?style=flat-square
  :target: https://codecov.io/github/Nekmo/stream-anywhere
  :alt: Test coverage

.. image:: https://img.shields.io/requires/github/Nekmo/stream-anywhere.svg?style=flat-square
  :target: https://requires.io/github/Nekmo/stream-anywhere/requirements/?branch=master
  :alt: Requirements Status


Play a video on your pc and continue on your smartphone

Development commands
====================

Type checks
-----------

Running type checks with mypy::

  $ mypy stream_anywhere


Test coverage
-------------

To run the tests, check your test coverage, and generate an HTML coverage report::

    $ coverage run -m pytest
    $ coverage html
    $ open htmlcov/index.html


Celery
------

This app comes with Celery. To run a celery worker:

.. code-block:: bash

    celery -A stream_anywhere worker -l info
