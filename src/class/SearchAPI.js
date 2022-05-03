import Parsers from "@/parser/parsers";

class SearchAPI {
  TEXT = {
    notFound: "Ничего не найдено :(",
    need: "Необходимо больше данных...",
    loading: "Идёт поиск...",
    error: "Не удалось выполнить поиск",
  };

  controller = new AbortController();
  timeout = null;
  debounce = 250;
  Fetch = new Parsers();

  constructor() {}

  query({ query, setFunction }) {
    this.clear();
    if (!(typeof query == "string" && query)) {
      setFunction({ text: this.TEXT.need, result: [] });
      return;
    }
    if (query.trim().length < 3) {
      setFunction({ text: this.TEXT.need, result: [] });
      return;
    } else {
      setFunction({ text: this.TEXT.loading, result: [] });
    }

    //! Проверка на группу
    query = query.trim().toLowerCase();

    this.timeout = setTimeout(async () => {
      try {
        const data = await this.Fetch.fetchSearch({
          query: query,
          signal: this.controller.signal,
        });

        if (data.length == 0) {
          const d = 1;
          setFunction({ text: this.TEXT.notFound, result: [] });
        } else {
          setFunction({
            text: this.TEXT.loading,
            result: this.formResult(data),
          });
        }
      } catch (e) {
        if (e.name == "AbortError") {
          return;
        }

        setFunction({ text: this.TEXT.error, result: [] });
      }
    }, this.debounce);
  }

  clear() {
    this.controller.abort();
    this.controller = new AbortController();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  formResult(data) {
    let result = [];
    data.forEach((entry) => {
      const obj = {};
      switch (entry.type) {
        case "group":
          obj.text = entry.content.id;
          obj.value = {
            type: entry.type,
            id: entry.content.id,
            label: obj.text,
          };
          break;
        case "teacher":
          obj.text = `${entry.content.Surname} ${entry.content.Name} ${entry.content.Middlename}`;
          obj.value = {
            type: entry.type,
            id: entry.content.id,
            label: obj.text,
          };
          break;
        case "location":
          obj.text = `${entry.content.aud} ${entry.content.corp}`;
          obj.value = {
            type: entry.type,
            id: entry.content.id,
            label: obj.text,
          };
          break;
      }
      result.push(obj);
    });
    return result;
  }

  async searchMobile(value) {
    if (value) {
      this.controller.abort();
      this.controller = new AbortController();
      this.search = [];
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (value.trim().length < 3) {
        this.noDataText = "Для поиска нужно более 2 символов";
      } else {
        this.noDataText = "Поиск...";
      }

      this.timeout = setTimeout(async () => {
        const Fetch = new Parsers();

        const search = await Fetch.fetchSearch({
          query: value,
          signal: this.controller.signal,
        });
        if (search) {
          this.noDataText = "Ничего не найдено :(";
        }
        for (let i = 0; i < search.length && i < 10; i++) {
          const entry = search[i];
          const obj = {};
          switch (entry.type) {
            case "group":
              obj.text = entry.content.id;
              obj.value = {
                type: entry.type,
                id: entry.content.id,
                label: obj.text,
              };
              break;
            case "teacher":
              obj.text = `${entry.content.Surname} ${entry.content.Name} ${entry.content.Middlename}`;
              obj.value = {
                type: entry.type,
                id: entry.content.id,
                label: obj.text,
              };
              break;
            case "location":
              obj.text = `${entry.content.aud} ${entry.content.corp}`;
              obj.value = {
                type: entry.type,
                id: entry.content.id,
                label: obj.text,
              };
              break;
            default:
              continue;
          }
          this.search.push(obj);
        }
      }, this.debounce);
    }
  }
}

export default new SearchAPI();
