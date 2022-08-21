/*eslint-disable*/
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function App() {

  let post = '강남 우동 맛집';
  let [article,setArticle] = useState(['하리보 젤리','오예스','사과파이 과자']); //state가 변경되면 html이 자동으로 재렌더링->자주 변경될것 같으면 state사용
  let [likenum,setLikenum] = useState([0,0,0]); //state변경함수(새로운state)
  let [modal,setModal] = useState(false);
  let [title,setTitle] = useState(0);
  let [invalue,setInvalue]= useState('');

  const todayTime = () => {
    let now = new Date();  // 현재 날짜 및 시간
    let todayYear = now.getFullYear(); 
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + '.' + todayMonth + '.' + todayDate + '/' + dayOfWeek 
    +'/'+ hours + '시' + minutes + '분';

  }
  //array자료 개수만큼 함수안의 코드를 실행해줌!
 
  [1,2,3].map(function(){

  })
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'white',fontSize:'16px'}}>CoCo Market</h4>
      </div>
      {/* <div className="list">
        <h4>{article[0]} <span onClick={()=>{setLikenum(likenum+1)}}>👍</span> {likenum} </h4> 
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{article[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{setModal(!modal)}}>{article[2]}</h4>
        <p>2월 17일 발행</p>
      </div> */}
      
      {
        article.map(function(a,i){
          return (
            <div className="list" key={i}>
            <h4 onClick={()=>{
              setModal(!modal)
              setTitle(i)
            }}>{article[i]} <span onClick={(e)=>{
              e.stopPropagation();
              let copy=[...likenum];
              copy[i]=copy[i] + 1;
              setLikenum(copy)
            }}>👍</span> {likenum[i]} <button onClick={(e)=>{
              e.stopPropagation();
              console.log(e);
              let copy = [...article];
              copy.splice(i,1); //i번째(포함)부터 1개의 원소 지우기
              setArticle(copy);
              let copy1=[...likenum];
              copy1.splice(i,1);
              setLikenum(copy1);
            }}>삭제</button></h4>
            <div>{todayTime().slice(0, 10)}
              <span style={{color:'green'}}> {todayTime().slice(10, 11)} </span>
              <span >{todayTime().slice(11, 18)}</span>
            </div>
            </div>
          )
        })
      }
      <p>글제목: <input onChange={(e)=>{
        setInvalue(e.target.value);
      }}></input> <button onClick={()=>{
        console.log(invalue);
        let copy = [...article];
        copy.unshift(invalue); //배열앞에 원소 추가
        setArticle(copy);
        let copy1 = [...likenum];
        copy1.unshift(0);
        setLikenum(copy1);
        //setArticle(article.concat(invalue));
      }}>글추가</button></p>
      {
        modal==true ? <Modal articles={article} setArticle={setArticle} title={title}/> : null
      }
      <Modal2></Modal2>
      <Homework></Homework>
    </div>
  );
}

function Modal(props){
  return(
    <div className="modal">
      <h4>{props.articles[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.articles];
        copy[0]='오예스';
        props.setArticle(copy)
      }}>글수정</button>
    </div>
  ) 
}
//변수랑 함수를 많이 보관할 수 있는 통 (props 사용법:this.props이런식으로 return 안에서 사용하면됨)
class Modal2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render(){
    return(
      <div>안녕 {this.state.age}  
        <button onClick={()=>{
          this.setState({age : 21})
        }}>버튼</button>
      </div>
    )
  }
}
function Homework(){
  return(
    <div className="modal">
      <img src={require("./images/IMG_9449.png")} style={{width:'100px',height:'100px'}}/>
      <button>업로드</button>
    </div>
  )
}

export default App;