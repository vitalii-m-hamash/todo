import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { addTodo, removeTodo, setTodoStatus } from './store/todoSlice';
import { addItem } from './store/itemsSlice';

import {
  Button,
  Input,
  List,
  Space,
  Typography,
  Checkbox,
  Tabs,
  TabsProps,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

function App() {
  const [todoDescription, setTodoDescription] = useState('');

  const todoList = useSelector((state: RootState) => state.todos);
  const deletedList = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: (
        <List
          style={{ width: '400px', marginTop: '15px' }}
          size="small"
          bordered
          dataSource={todoList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Checkbox
                  value={item.completed}
                  onChange={() => {
                    dispatch(
                      setTodoStatus({ completed: !item.completed, id: item.id })
                    );
                  }}
                />,
                <Button
                  onClick={() => {
                    dispatch(addItem(item));
                    dispatch(removeTodo(item.id));
                  }}
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />,
              ]}
              style={{
                textDecoration: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.description}
            </List.Item>
          )}
        />
      ),
    },
    {
      key: '2',
      label: 'Completed',
      children: (
        <List
          style={{ width: '400px', marginTop: '15px' }}
          size="small"
          bordered
          dataSource={todoList.filter((item) => item.completed === true)}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Checkbox
                  value={item.completed}
                  onChange={() => {
                    dispatch(
                      setTodoStatus({ completed: !item.completed, id: item.id })
                    );
                  }}
                />,
                <Button
                  onClick={() => {
                    dispatch(addItem(item));
                    dispatch(removeTodo(item.id));
                  }}
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />,
              ]}
              style={{
                textDecoration: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.description}
            </List.Item>
          )}
        />
      ),
    },
    {
      key: '3',
      label: 'Deleted',
      children: (
        <List
          style={{ width: '400px', marginTop: '15px' }}
          size="small"
          bordered
          dataSource={deletedList}
          renderItem={(item) => <List.Item>{item.description}</List.Item>}
        />
      ),
    },
  ];

  return (
    <div>
      <Title>Todo App</Title>
      <Space.Compact>
        <Input
          style={{ width: '300px' }}
          placeholder="type todo..."
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
        />
        <Button
          style={{ width: '100px' }}
          type="primary"
          onClick={() => {
            dispatch(addTodo(todoDescription));
            setTodoDescription('');
          }}
        >
          Add todo
        </Button>
      </Space.Compact>

      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default App;
