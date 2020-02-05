import {Item} from '../model/feeddata.interface';
import {Impediment, ResponseItem} from '../model/response.interface';

export default class ResponseItemCreator {
  public createResponseItem(item: Item): ResponseItem {
    const impediments: Impediment[] = this.createImpediments(item.content);

    return {
      impediments: impediments,
      snippets: this.createSnippets(item.content),
      author: item.author,
      link: item.link,
      pubDate: item.isoDate,
    };
  }

  private createImpediments(content: string): Impediment[] {
    const impediments: Impediment[] = [];
    const snippets: string[] = content.split('<br>\n');

    snippets.forEach((snippet: string) => {
      const infoArray: string[] = snippet.split(',');

      if (infoArray[0] != '') {
        if (infoArray.length == 2) {
          impediments.push({
            happening: infoArray[1].trim(),
            lesson: null,
            room: null,
            time: infoArray[0].trim(),
          });
        } else {
          impediments.push({
            happening: infoArray[3].trim(),
            lesson: infoArray[1].trim(),
            room: infoArray[2].trim(),
            time: infoArray[0].trim(),
          });
        }
      }
    });

    return impediments;
  }

  private createSnippets(content: string): string[] {
    const snippets: string[] = content.split('<br>\n');

    snippets.forEach((snippet) => {
      if (snippet != '') return snippet;
    });

    return snippets;
  }
}
