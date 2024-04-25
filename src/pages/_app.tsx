import { AuthProvider } from '@/page-components/auth/authContext';
import { MainLayout as Layout } from '@/page-components/layout/MainLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

require('@/styles/global.less');

function CustomApp({ Component, pageProps }: any) {
  return (
    <DndProvider backend={HTML5Backend}>
    <ConfigProvider locale={zhCN}>
        <AuthProvider>
          <div id="root">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </AuthProvider>
      </ConfigProvider>
    </DndProvider>
  );
}

export default CustomApp;
