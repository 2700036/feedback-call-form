class GazillaApi {
  constructor() {
    this.baseUrl = "https://interview.gazilla-lounge.ru/api/";
  }
  prepareData = ({ phone, date, comment }) => {
    return {
      id: Math.floor(Math.random() * 1000000),
      data: {
        phone: phone.replace(/[-()\s]+/g, ""),
        date: new Date(date).getTime(),
        comment
      }
    };
  };

  postRequest = data => {
    return fetch(`${this.baseUrl}submit`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(this.prepareData(data))
    })
      .then(res => res.json())
      .then(res => (res.data !== null ? res : Promise.reject(res)))
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  test = data => {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        reject({
          id: this.prepareData(data).id,
          error: {
            code: 503,
            reason: "random error"
          }
        });
      } else {
        resolve({
          id: this.prepareData(data).id,
          data: {
            success: true
          }
        });
      }
    });
  };
}

export default new GazillaApi();
