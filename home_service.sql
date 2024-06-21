#registrationregistrationCREATE DATABASE home_service;

USE home_service;

-- Table: contact
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT
);

-- Table: registration
CREATE TABLE users (
    u_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    mobile VARCHAR(20),
    fname VARCHAR(255),
    lname VARCHAR(255),
    address TEXT
);

-- Table: admin
CREATE TABLE admin (
    a_id INT AUTO_INCREMENT PRIMARY KEY,
    a_name VARCHAR(255),
    a_email VARCHAR(255),
    a_password VARCHAR(255),
    a_mobile VARCHAR(20)
    
);

-- Table: team
CREATE TABLE team (
    t_id INT AUTO_INCREMENT PRIMARY KEY,
    t_name VARCHAR(255),
    t_image VARCHAR(255),
    t_work VARCHAR(255)
);

-- Table: category
CREATE TABLE category (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(255),
    c_img VARCHAR(255)
);

-- Table: services
CREATE TABLE services (
    s_id INT AUTO_INCREMENT PRIMARY KEY,
    c_id INT,
    s_name VARCHAR(255),
    s_price DECIMAL(10,2),
    s_decs TEXT,
    status INT DEFAULT 0
);

-- Table: serviceimage
CREATE TABLE serviceimage (
    si_id INT AUTO_INCREMENT PRIMARY KEY,
    s_id INT,
    si_image VARCHAR(255)
);

-- Table: servicecity
CREATE TABLE servicecity (
    sc_id INT AUTO_INCREMENT PRIMARY KEY,
    s_id INT,
    city_id INT
);
-- Table: book
CREATE TABLE book (
    b_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    b_amount DECIMAL(10,2),
    c_d_amount DECIMAL(10,2),
    c_code VARCHAR(255),
    b_date DATE,
    status INT DEFAULT 0,
    pay_id VARCHAR(255)
);

-- Table: b_detail
CREATE TABLE b_detail (
    b_d_id INT AUTO_INCREMENT PRIMARY KEY,
    b_id INT,
    s_id INT,
    qty INT,
    s_price DECIMAL(10,2),
    b_d_date DATE,
    b_d_time TIME,
    address TEXT
);

-- Table: orderproduct
CREATE TABLE orderproduct (
    o_id INT AUTO_INCREMENT PRIMARY KEY,
    c_d_amount DECIMAL(10,2),
    c_code VARCHAR(255),
    o_amount DECIMAL(10,2),
    o_date DATE,
    u_id INT,
    pay_id VARCHAR(255),
    status INT DEFAULT 0
);

-- Table: order_detail
CREATE TABLE order_detail (
    od_id INT AUTO_INCREMENT PRIMARY KEY,
    o_id INT,
    p_id INT,
    qty INT,
    p_price DECIMAL(10,2),
    address TEXT
);

-- Table: country
CREATE TABLE country (
    con_id INT AUTO_INCREMENT PRIMARY KEY,
    con_name VARCHAR(255)
);

-- Table: state
CREATE TABLE state (
    sta_id INT AUTO_INCREMENT PRIMARY KEY,
    con_id INT,
    sta_name VARCHAR(255)
);

-- Table: city
CREATE TABLE city (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    con_id INT,
    sta_id INT,
    city_name VARCHAR(255)
);

-- Table: coupon
CREATE TABLE coupon (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_code VARCHAR(255),
    c_type INT,
    c_amount DECIMAL(10,2),
    c_nouser INT,
    c_minamount DECIMAL(10,2),
    c_sdate DATE,
    s_edate DATE
);

-- Table: review
CREATE TABLE review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    rate INT,
    rmessage TEXT,
    p_id INT
);

-- Table: servicereview
CREATE TABLE servicereview (
    servicereview_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    rate INT,
    rmessage TEXT,
    s_id INT
);

-- Table: servicewishlist
CREATE TABLE servicewishlist (
    w_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    s_id INT
);

-- Table: productwishlist
CREATE TABLE productwishlist (
    w_id INT AUTO_INCREMENT PRIMARY KEY,
    u_id INT,
    p_id INT
);

-- Table: product
CREATE TABLE product (
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(255),
    p_price DECIMAL(10,2),
    p_image VARCHAR(255),
    p_desc TEXT,
    qty INT
);
