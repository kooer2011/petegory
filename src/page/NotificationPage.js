import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Tabs, message, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NotificationPage = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //
    const itemsPerPage = 3; // จำนวนรายการที่ต้องการแสดงในหนึ่งหน้า
    const [currentPage, setCurrentPage] = useState(1);
    // นับจำนวน unread ที่มีใน state.user.notification
    const unreadCount = user?.notification.filter(notificationMgs => !notificationMgs.isRead).length;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderUnreadNotifications = () => {
        // ตัวแปรในการหา index ของข้อมูลที่จะแสดงในหน้านั้น ๆ
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return user?.notification
            .filter(notificationMgs => !notificationMgs.isRead)
            .slice(startIndex, endIndex)
            .map((notificationMgs, index) => (
                <div
                    className='card mb-2'
                    style={{ cursor: 'pointer' }}
                    key={index}
                >
                    <div
                        className='card-text p-2'
                        onClick={() => navigate(notificationMgs.onClickPath)}
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {notificationMgs.message}
                    </div>
                </div>
            ));
    };
    //

    const handleMarkRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/getNotification',
                { userId: user._id },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload()
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('someting went wrong')
        }
    }

    const handleDeleteRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/deleteNotification',
                { userId: user._id },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload()
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('Someting Went Wrong In Notifications')
        }
    }
    return (
        <Layout>
            <h4 className='p-3 text-center'>Notification</h4>
            <Tabs>
                <Tabs.TabPane tab={`unRead (${unreadCount})`} key={0}>
                    <div className='d-flex justify-content-end'>
                        <h4
                            className='p-2 text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={handleMarkRead}
                        >
                            Mark All Read
                        </h4>
                    </div>
                    <div className='pagination-container'>
                        {renderUnreadNotifications()}
                        <Pagination
                            current={currentPage}
                            total={user?.notification.filter(notificationMgs => !notificationMgs.isRead).length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                        />
                    </div>

                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-danger' style={{ cursor: 'pointer' }}
                            onClick={handleDeleteRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seenotification.map(notificationMgs => (
                            <div className='card mb-2'
                                style={{ cursor: 'pointer' }}
                            >
                                <div className='card-text p-2 Msg'
                                    onClick={() => navigate(notificationMgs.onClickPath)}
                                >
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage