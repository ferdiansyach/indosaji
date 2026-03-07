import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = ({ url }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list")
            if (response.data.success) {
                setOrders(response.data.data)
            } else {
                toast.error("Gagal memuat data pesanan")
            }
        } catch (error) {
            toast.error("Error koneksi server")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const totalRevenue = orders
        .filter(o => o.payment === true)
        .reduce((sum, o) => sum + o.amount, 0)

    const totalOrders = orders.length
    const paidOrders = orders.filter(o => o.payment === true).length
    const pendingOrders = orders.filter(o => o.payment !== true).length
    const deliveredOrders = orders.filter(o => o.status === "Delivered").length

    const estimatedCost = totalRevenue * 0.4
    const profit = totalRevenue - estimatedCost

    const formatRp = (n) => "Rp" + n.toLocaleString('id-ID')

    const recentOrders = [...orders].reverse().slice(0, 10)

    if (loading) {
        return (
            <div className="dashboard">
                <h3>Dashboard</h3>
                <p className="dashboard-loading">Memuat data...</p>
            </div>
        )
    }

    return (
        <div className='dashboard'>
            <h3>Dashboard</h3>

            <div className="dashboard-cards">
                <div className="dash-card revenue">
                    <div className="dash-card-icon">💰</div>
                    <div className="dash-card-info">
                        <p className="dash-card-label">Total Pendapatan</p>
                        <h2>{formatRp(totalRevenue)}</h2>
                    </div>
                </div>

                <div className="dash-card orders">
                    <div className="dash-card-icon">📦</div>
                    <div className="dash-card-info">
                        <p className="dash-card-label">Total Pesanan</p>
                        <h2>{totalOrders}</h2>
                    </div>
                </div>

                <div className="dash-card profit">
                    <div className="dash-card-icon">📈</div>
                    <div className="dash-card-info">
                        <p className="dash-card-label">Estimasi Laba</p>
                        <h2>{formatRp(profit)}</h2>
                    </div>
                </div>

                <div className="dash-card delivered">
                    <div className="dash-card-icon">✅</div>
                    <div className="dash-card-info">
                        <p className="dash-card-label">Terkirim</p>
                        <h2>{deliveredOrders}</h2>
                    </div>
                </div>
            </div>

            <div className="dashboard-stats-row">
                <div className="dash-stat-card">
                    <h4>Status Pembayaran</h4>
                    <div className="stat-bars">
                        <div className="stat-row">
                            <span className="stat-label">Lunas</span>
                            <div className="stat-bar-bg">
                                <div className="stat-bar-fill paid" style={{ width: totalOrders > 0 ? `${(paidOrders / totalOrders) * 100}%` : '0%' }}></div>
                            </div>
                            <span className="stat-value">{paidOrders}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Pending</span>
                            <div className="stat-bar-bg">
                                <div className="stat-bar-fill pending" style={{ width: totalOrders > 0 ? `${(pendingOrders / totalOrders) * 100}%` : '0%' }}></div>
                            </div>
                            <span className="stat-value">{pendingOrders}</span>
                        </div>
                    </div>
                </div>

                <div className="dash-stat-card">
                    <h4>Ringkasan Keuangan</h4>
                    <div className="finance-summary">
                        <div className="finance-row">
                            <span>Total Pendapatan</span>
                            <span className="amount green">{formatRp(totalRevenue)}</span>
                        </div>
                        <div className="finance-row">
                            <span>Estimasi Biaya (40%)</span>
                            <span className="amount red">{formatRp(estimatedCost)}</span>
                        </div>
                        <hr />
                        <div className="finance-row total">
                            <span>Estimasi Laba Bersih</span>
                            <span className={`amount ${profit >= 0 ? 'green' : 'red'}`}>{formatRp(profit)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-recent">
                <h4>Pesanan Terbaru</h4>
                <div className="recent-table">
                    <div className="recent-header">
                        <span>Pelanggan</span>
                        <span>Items</span>
                        <span>Jumlah</span>
                        <span>Status</span>
                        <span>Bayar</span>
                    </div>
                    {recentOrders.length === 0 && <p className="no-data">Belum ada pesanan</p>}
                    {recentOrders.map((order, i) => (
                        <div key={i} className="recent-row">
                            <span>{order.address?.firstName || '-'} {order.address?.lastName || ''}</span>
                            <span>{order.items?.length || 0} items</span>
                            <span>{formatRp(order.amount)}</span>
                            <span className={`status-badge ${order.status === 'Delivered' ? 'delivered' : order.status === 'Out for delivery' ? 'otw' : 'processing'}`}>
                                {order.status}
                            </span>
                            <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                                {order.payment ? 'Lunas' : 'Pending'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
