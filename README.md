# 🎇목차

1. [💻 프로젝트 소개](#-프로젝트-소개)
2. [📁 directory 구조](#-directory-구조)
3. [⏲ 개발 기간](#-개발-기간)
4. [❗ 개발 환경](#-개발-환경)
5. [📌 주요 기능](#-주요-기능)
6. [🧾 code review](#-code-review)
   - [데이터 불러오기(Read)](#-데이터-불러오기read)
   - [새 글 쓰기 기능(Create)](#-새-글-쓰기-기능create)
   - [글 수정 기능(Update)](#-글-수정-기능update)
   - [글 삭제 기능(Delete)](#-글-삭제-기능delete)
7. [📢 배포](#📢-배포)

<br>

# 💻 프로젝트 소개

<div align="center">
   <img src="https://github.com/future9061/Comment/assets/132829711/8cb4a829-b9f0-45e2-b553-f9e098b5d666" width="700px">
</div>

#### 🤔 저의 깃허브를 방문한 사람들이 프로젝트나 코드를 본 후 그에 대한 코멘트를 받을 수 없다는 게 아쉬웠습니다. <br /> 방문자의 조언이나 격려를 받을 수 있다면 더 많은 동기유발이 될 수 있을 것 같아 제작한 Comment 프로젝트 입니다.

- `URI` : http://ec2-52-79-243-158.ap-northeast-2.compute.amazonaws.com:5000
- AWS EC2로 배포
- 클라이언트는 react, 서버는 node.js, express 프레임 워크로 구축
- 데이터는 몽고DB에 저장해 관리
- express router로 HTTP method 마다 모듈화하여 관리
- 컴포넌트 별로 스타일을 모듈화하여 관리
- cors 이슈를 http-proxy-middleware 라이브러리로 관리

<br>

# 📁 directory 구조

- ### client directory

```
📦client
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂store //redux로 상태관리
 ┃ ┣ 📂style //scss로 컴포넌트마다 스타일 지정
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┗ 📜setupProxy.js
 ┗ 📜package.json
```

- ### server directory

```
📦server
 ┣ 📂Model //몽고 db 스키마 모델 관리
 ┃ ┣ 📜Counter.js
 ┃ ┗ 📜Item.js
 ┣ 📂Router //http 메소드 별로 router 관리
 ┃ ┣ 📜delete.js
 ┃ ┣ 📜get.js
 ┃ ┣ 📜post.js
 ┃ ┗ 📜put.js
 ┣ 📜config.env //몽고db URI를 dotenv로 관리
 ┣ 📜index.js
 ┗ 📜package.json
```

<br>

# ⏲ 개발 기간

- 2023.09.17 ~ 2023.09.20

<br>

# ❗ 개발 환경

- **Editor** : `vs code 1.77`
- **Runtime** : `Node.js`
- **Framework**
  - client : `react(18.2.0)`
  - server : `express(4.18.2)`
- **Library**
  - client : `axios(1.5.0)` `reduxjs/toolkit(1.9.5)` `http-proxy-middleware(2.0.6)` `emotion/react(11.11.1)`
  - server : `express(4.18.2)` `mongodb(6.1.0)` `mongoose(7.5.2)` `dotenv(16.3.1)`
- **Cloud service**
  - `AWS EC2`

<br>

# 📌 주요 기능

- 데이터 불러오기(Read)
  - App 컴포넌트가 랜더링 되면 get 메소드로 서버에 데이터를 요청합니다.
  - 요청을 받은 서버는 find 프로토타입으로 데이터를 반환해 클라이언트에 전달합니다.

<br >

- 새 글 쓰기 기능(Create)
  - 사용자가 새 글을 입력 시 새 글의 데이터와 함께 post 요청이 서버에 요청합니다.
  - 요청을 받은 서버는 새 글의 고유 번호 관리를 위해 카운터 모델에서 number를 받아옵니다.
  - 받아온 number와 함께 데이터 저장합니다.
  - 저장이 완료되면 카운터 모델은 $inc로 1 증가시킴으로서 데이터 마다 다른 number를 부여합니다.

<br >

- 글 수정 기능(Update)
  - 사용자가 기존 글을 수정 시 수정 데이터와 함께 put 요청이 서버에 요청합니다.
  - 요청을 받은 서버는 데이터의 number와 일치하는 데이터를 찾아 $set으로 데이터를 변경합니다.

<br >

- 글 삭제 기능(Delete)
  - 사용자가 글을 삭제 시 해당 글의 number와 함께 delete 요청이 서버에 요청합니다.
  - Delete 요청을 받은 서버는 해당 number와 일치하는 데이터를 찾아 삭제합니다.

<br >

# 🧾 code review

<br >

#### ✔ 데이터 불러오기(Read)

- 클라이언트에서 App 컴포넌트가 랜더링 될 시 서버로 get 요청

```javascript
//client
useEffect(() => {
  axios
    .get("/api/read")
    .then((res) => {
      res.data.success && dispatch(getList(res.data.ItemList));
    })
    .catch((err) => console.log(err));
}, []);
```

- 요청을 받은 서버가 몽고DB Item 모델에서 데이터를 찾아 응답

```javascript
//server

router.get("/read", (req, res) => {
  Item.find()
    .then((doc) => {
      res.send({ success: true, ItemList: doc });
    })
    .catch((err) => console.log(err));
});
```

<br >

#### ✔ 새 글 쓰기 기능(Create)

- 새 글 작성 버튼을 클릭 시 해당 글의 내용과 정보를 body에 객체 형태로 담아 서버에 요청

```javascript
//client

const handleSubmit = (e) => {
  e.preventDefault();

  let body = {
    name: name,
    content: content,
    date: `${time.year}.${time.month}.${time.day} (${
      time.Week[today.getDay()]
    })`,
    time: `${time.amPm} ${time.hour}:${time.minutes}`,
  };

  axios
    .post("/api/submit", body)
    .then((res) => {
      if (res.data.success) {
        setName("");
        setContent("");
        dispatch(getList(res.data.ItemList));
      }
    })
    .catch((err) => console.log(err));
};
```

- 요청을 받은 서버는 고유의 ItemNum를 가진 데이터를 저장
- ItemNum을 가진 카운터 모델은 $inc로 1 증가

```javascript
//server

router.post("/submit", (req, res) => {
  Counter.findOne({ name: "counter" })
    .then((counter) => {
      req.body.ItemNum = counter.ItemNum;
      const commentItem = new Item(req.body);
      commentItem.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { ItemNum: 1 } }).then(
          () => {
            Item.find().then((doc) => {
              res.send({ success: true, ItemList: doc });
            });
          }
        );
      });
    })
    .catch((err) => console.log(err));
});
```

<br >

#### ✔ 글 수정 기능(Update)

- 수정을 클릭하면 해당 데이터와 함께 put메소드로 서버에 요청

```javascript
//client

const handleUpdate = (e) => {
  e.preventDefault();

  let body = {
    name: name,
    content: content,
    date: `${time.year}.${time.month}.${time.day} (${
      time.Week[today.getDay()]
    })`,
    time: `${time.amPm} ${time.hour}:${time.minutes}`,
  };

  axios
    .put("/api/update", body)
    .then((res) => {
      console.log(res.data.success);
      res.data.success && setEditState("");
      dispatch(getList(res.data.ItemList));
    })
    .catch((err) => console.log(err));
};
```

- 요청을 받은 서버는 해당 ItemNum를 가진 데이터를 $set으로 변경

```javascript
//server
router.put("/update", ({ body }, res) => {
  Item.updateOne({ ItemNum: body.ItemNum }, { $set: body })
    .then(() => {
      Item.find().then((doc) => {
        res.send({ success: true, ItemList: doc });
      });
    })
    .catch((err) => console.log(err));
});
```

<br />

#### ✔ 글 삭제 기능(Delete)

- 삭제 버튼 클릭 시 해당 아이템의 고유의 번호와 함께 서버에 delete 요청

```javascript
//client

const handleDelete = (e) => {
  e.preventDefault();
  let ItemNum = e.target.id;

  if (window.confirm("정말로 삭제하시겠습니까?")) {
    axios
      .delete("/api/delete", { data: { ItemNum: ItemNum } })
      .then((res) => {
        res.data.success && dispatch(getList(res.data.ItemList));
      })
      .catch((err) => console.log(err));
  }
};
```

- 요청을 받은 서버는 고유의 번호를 가진 데이터를 찾아 삭제

```javascript
//server

router.delete("/delete", (req, res) => {
  let ItemNum = Number(req.body.ItemNum);

  Item.deleteOne({ ItemNum: ItemNum })
    .then(() => {
      Item.find().then((doc) => {
        res.send({ success: true, ItemList: doc });
      });
    })
    .catch((err) => console.log(err));
});
```

<br />

# 📢 배포

- AWS EC2 서비스를 이용하여 배포하였습니다.
- 리액트를 빌드 해 서버에 제공
- EC2 인스턴스 생성 후 SSH로 가상 컴퓨터와 내 로컬 컴퓨터와 연결
- 보안 규칙에 포트 5000 추가하여 배포를 완료했습니다.
