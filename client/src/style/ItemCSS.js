import styled from "@emotion/styled";

const ItemList = styled.li`
width: 60%;
margin: 30px auto;
background-color: #e2f6cd;
padding: 15px 15px 5px;
border-radius: 10px;
  >div{
    display:flex;
    justify-content:space-between;
    margin-bottom:10px;
    >div{
      display:flex;
      flex-direction:column;
     
      sub {
        text-align:end;
        font-weight: normal;
        font-size:0.6em;

        &:last-child{
          margin-right:5px;
        }
      }
    }

  }

  .buttons {
    margin-top: 10px;
    display:flex;
    justify-content:end;
  
    button {
      &:first-child {
        background-color: #f4dcdc;
      }
      &:last-child {
        background-color: #e3daeb;
      }
      &:active   {
       filter:brightness(80%);
      }
    }
}
`

export default ItemList