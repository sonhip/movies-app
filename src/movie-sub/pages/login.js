import React, {useState} from 'react';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import {useHistory} from 'react-router-dom';
import * as helper from '../helper/common';
import * as api  from '../services/login'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const LoginPage = () => {
    const history = useHistory();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [messageError, setMessageError] = useState('')

    const onFinish = async (values) => {
        const user = values.username;
        const pass = values.password;
        

        //call api
        setLoadingLogin(true);
        const data = await api.loginApi(user, pass);
        setLoadingLogin(false);
        if(!helper.isEmptyObject(data)){
            if(data.code===200){
                setLoadingLogin(false);
                setMessageError('');
                api.saveTokenLocalStorage(data.token_user);
                history.push('/home');
            }else{
                setLoadingLogin(false);
                setMessageError('account is invalid');
                api.removeTokenLocalStorage();
            }
        }else{
            setLoadingLogin(false);
            setMessageError('account is invalid');
            api.removeTokenLocalStorage();
        }
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return(
        <Row>
            <Col span={12} offset={6}>
                <h1 style={{textAlign:'center', margin:'10px 0px'}}>Login User</h1>
                {messageError !=='' && <h1 style={{textAlign:'center', margin:'5px 0', color:'red'}}>{messageError}</h1>}
                <Row>
                    <Col span={12}>
                    <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                Login
                                </Button>
                                {loadingLogin && <Spin style={{marginLeft: '10px'}} />}
                                {/* <Link to={'/'}>back to Home</Link> */}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default React.memo(LoginPage);