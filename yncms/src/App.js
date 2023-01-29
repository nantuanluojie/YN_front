import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { Button, Divider, Card, List } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);


  useEffect(() => {
    axios.post('http://yncms.domiruby.cn/blog/list', {
      page_num: 0,
      page_size: 5
    })
    .then(function (response) {
      console.log(response.data);
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);



  



  return (
    <div className="App">
          <Button type="primary" style={{marginTop: "20px"}}>Test</Button>
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
