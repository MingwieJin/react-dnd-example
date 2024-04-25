import { NextPage } from 'next';
import { Spin } from 'antd';

export default function Home() {
  return (
      <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Spin size="large" />
      </div>
  )
}
