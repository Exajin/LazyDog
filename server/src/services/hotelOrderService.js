import pool from "../config/mysql.js";

export const getAllOrders = async () => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM hotel_order WHERE is_deleted=0"
    );
    return orders;
  } catch (err) {
    throw new Error("無法取得此訂單:" + err.message);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const [[order]] = await pool.query(
      "SELECT * FROM hotel_order WHERE id = ? AND is_deleted = 0",
      [orderId]
    );
    return order || null;
  } catch (err) {
    throw new Error("無法取得該訂單" + err.message);
  }
};

export const getOpHotelId = async (operatorId) => {
  try {
    const [hotels] = await pool.query(
      "SELECT id FROM hotel WHERE operator_id = ? AND is_deleted = 0",
      [operatorId]
    );
    return hotels.map((hotel) => hotel.id);
  } catch (err) {
    throw new Error("無法取得該操作員的飯店 ID: " + err.message);
  }
};

export const createNewOrders = async (orderData) => {
  try {
    const {
      user_id,
      hotel_id,
      dog_count,
      check_in,
      check_out,
      total_price,
      payment_status,
      payment_method,
      cancellation_policy,
      remark,
    } = orderData;
    const [result] = await pool.query(
      `INSERT INTO hotel_order (user_id, hotel_id, dog_count, check_in, check_out, total_price, status, payment_status, payment_method, cancellation_policy, remark, created_at, updated_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, NOW(), NOW(), 0)`,
      [
        user_id,
        hotel_id,
        dog_count,
        check_in,
        check_out,
        total_price,
        payment_status,
        payment_method,
        cancellation_policy,
        remark,
      ]
    );
    return { id: result.insertId, ...orderData, status: "pending" };
  } catch (err) {
    throw new Error("無法創建訂單: " + err.message);
  }
};
export const updateOrderById = async (orderId, updateData) => {
    try {
      const [result] = await pool.query(
        "UPDATE hotel_order SET ? WHERE id = ? AND is_deleted = 0",
        [updateData, orderId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("無法更新訂單: " + error.message);
    }
  };

  export const softDeleteOrderById = async (orderId) => {
    try {
      const [result] = await pool.query(
        "UPDATE hotel_order SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
        [orderId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("無法刪除訂單: " + error.message);
    }
  };
  