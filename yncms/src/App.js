import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { Button, Divider, Card, List, message,Modal,Input  } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';
import { click } from '@testing-library/user-event/dist/click';

const { TextArea } = Input;

function App() {

  const [data, setData] = useState([]);
  const [num, setNumber] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");



 


  useEffect(() => {
    axios.post('http://yncms.domiruby.cn/api/blog/list', {
      page_num: 0,
      page_size: 20
    })
    .then(function (response) {
      console.log(response.data);
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const handleClick = () => {
    setOpen(true);
  }

  const pressOK = () => {
    alert("fuckme");
  }


 const savePost = () => {
    axios.post('http://yncms.domiruby.cn/api/blog/add ', {
      title: title,
      content: content
    })
    .then(function (response) {
      console.log(response.data);
      messageApi.success("保存成功");
      setOpen(false);
      //刷新列表
      axios.post('http://yncms.domiruby.cn/api/blog/list', {
        page_num: 0,
        page_size: 20
    }).then(function (response) {
      console.log(response.data);
      setData(response.data);
    })}).catch(function (error) {
      console.log(error);
    });
  }


 
  
   
  



  return (
    <div className="App">
       {contextHolder}
          <Button type="primary" style={{marginTop: "20px"}} onClick={handleClick} >Test</Button>
       
          <Modal
            title="新建帖子"
            open={open}
            onOk={()=>savePost()}
            onCancel={ () => {
              setOpen(false);
            }}
           >
             <p>今天晚上吃什么</p>
             <Input  value={title} placeholder="标题" onChange={e => setTitle(e.target.value)} />
             <TextArea rows={4} value={content} onChange={e => setContent(e.target.value)} placeholder="最多60字" maxLength={60} />
          </Modal>

          <Divider />
          <Card title="帖子列表" >
            <List bordered dataSource={data}
             renderItem={
                (item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} description={item.content} />
                  </List.Item>
                )
             }>
              
          
            </List>
          </Card>
    </div>
  );
}

export default App;
