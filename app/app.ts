import express from 'express';
import Parser from 'rss-parser';
import FeedData from './model/feeddata.interface';
import ResponseItemCreator from './lib/ResponseItemCreator.service';
import ResponseInterface, {ResponseItem} from './model/response.interface';

// Create a new express application instance
const app: express.Application = express();

// Create parser
const parser: Parser = new Parser();

// Create item creator for response
const itemCreator: ResponseItemCreator = new ResponseItemCreator();

// Define Port
const PORT = process.env.PORT || '8174';

app.get('/wvs_rss/:ID', async function(req, res, next) {
  let status: number = 500;
  const feed = await parser.parseURL(
      'https://wvs-ffm.de/dateien/rss/vertretung/' +
        req.params.ID.toUpperCase() + '.xml',
  ).then((result) => {
    const serializedResult = result as unknown as FeedData;
    const data: ResponseItem[] = [];
    try {
        serializedResult.items?.forEach((item) => {
          data.push(itemCreator.createResponseItem(item));
        });

        status = 200;
    } catch (e) {
      return {
        success: false,
        feedURL: 'https://wvs-ffm.de/dateien/rss/vertretung/' + req.params.ID.toUpperCase() + '.xml',
        message: e.toString(),
      } as ResponseInterface;
    }

    return {
      success: true,
      feedURL: 'https://wvs-ffm.de/dateien/rss/vertretung/' + req.params.ID.toUpperCase() + '.xml',
      data: data,
    } as ResponseInterface;
  }).catch(((reason) => {
    return {
      success: false,
      feedURL: 'https://wvs-ffm.de/dateien/rss/vertretung/' + req.params.ID.toUpperCase() + '.xml',
      message: reason.toString(),
    } as ResponseInterface;
  }));

  res.status(status).send(feed);
});

app.listen(PORT, function() {
  console.log('WVS-JSON-Feed app listening on port ' + PORT.toString());
});
