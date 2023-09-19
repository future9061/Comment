import styled from '@emotion/styled'

const BannerDiv = styled.div`
  width: 80%;
  margin: 50px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-wrap {
    width: 400px;
    position: relative;
    margin-right: 30px;
    &::after {
      content: "";
      display: block;
      width: 300px;
      height: 300px;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: calc(50% - 150px);
      z-index: -1;
      filter: blur(20px);
      -webkit-filter: blur(10px);
    }

    img {
      width: 100%;
    }
  }
  .hi {
    display: inline-block;
    background-color: #ebebeb;
    padding: 20px;
    border-radius: 20px;
    width: 40%;

    h5 {
      position: relative;
      margin-bottom: 20px;
      font-size: 18px;
      &::after {
        content: "";
        width: 0px;
        height: 0px;
        background-color: #ebebeb;
        display: block;
        border-top: 20px solid #e3daeb;
        border-left: 20px solid #e3daeb;
        border-right: 20px solid #ebebeb;
        border-bottom: 20px solid #e3daeb;
        position: absolute;
        left: -60px;
      }
    }
    .highlihgt {
      position: relative;
      z-index: 1;
      &::before {
        content: "";
        display: block;
        width: 87%;
        height: 20px;
        background-color: rgba(243, 246, 205, 0.7);
        position: absolute;
        z-index: -1;
        top: 2px;
        transform: skew(20deg);
      }
      &::after {
        content: "";
        display: block;
        width: 50%;
        height: 25px;
        background-color: rgba(243, 246, 205, 0.7);
        position: absolute;
        z-index: -1;
        top: 25px;
        transform: skew(20deg);
      }
    }
  }

`

export default BannerDiv