import logo from './logo.svg'
import './App.css';
import { Button, Col, Input, Row, Space, Table } from "antd";
import "antd/dist/antd.css";
import { UserOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons'


const { Search } = Input;

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headerLogos">
          <img src={logo} className="App-logo" alt="logo" />
          <UserOutlined className="User-logo" />
        </div>
      </header>
      <body>
        <div className="SearchBar">
          <Space direction="vertical">
            <Search
              placeholder="Search Bar"
              allowClear
              enterButton="Search"
              size="middle"
            />
          </Space>
          <br />
          <a>
            <BarsOutlined />
          </a>
          <a>
            <AppstoreOutlined />
          </a>
        </div>

        <Table dataSource={dataSource} columns={columns} />;
      </body>
    </div>

  );
}

export default App;
