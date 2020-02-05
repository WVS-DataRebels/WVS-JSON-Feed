# WVS-JSON-Service

This is a JSON feed service for the cover plan of the Werner-von-Siemens school Frankfurt(Main).

## How it works

This school finally provides an RSS feed with cover plans depending on which school class you are.

Because XML is bad, let's create a JSON response ;)

## Usage

The current URL structure looks like:

GET: ``http://localhost:8174/wvs_feed/<school_class>``


For example: ``curl 'http://localhost:8174/wvs_feed/BFIC``

## License

This service is licensed under BSD-3-Clause license.
