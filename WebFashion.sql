USE [master]
GO
/****** Object:  Database [WebFashion]    Script Date: 8/9/2024 10:49:04 PM ******/
CREATE DATABASE [WebFashion]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WebFashion', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MAY2\MSSQL\DATA\WebFashion.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WebFashion_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MAY2\MSSQL\DATA\WebFashion_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [WebFashion] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WebFashion].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WebFashion] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [WebFashion] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [WebFashion] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [WebFashion] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [WebFashion] SET ARITHABORT OFF 
GO
ALTER DATABASE [WebFashion] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [WebFashion] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [WebFashion] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [WebFashion] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [WebFashion] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [WebFashion] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [WebFashion] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [WebFashion] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [WebFashion] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [WebFashion] SET  ENABLE_BROKER 
GO
ALTER DATABASE [WebFashion] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [WebFashion] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [WebFashion] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [WebFashion] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [WebFashion] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [WebFashion] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [WebFashion] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [WebFashion] SET RECOVERY FULL 
GO
ALTER DATABASE [WebFashion] SET  MULTI_USER 
GO
ALTER DATABASE [WebFashion] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [WebFashion] SET DB_CHAINING OFF 
GO
ALTER DATABASE [WebFashion] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [WebFashion] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [WebFashion] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [WebFashion] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'WebFashion', N'ON'
GO
ALTER DATABASE [WebFashion] SET QUERY_STORE = ON
GO
ALTER DATABASE [WebFashion] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [WebFashion]
GO
/****** Object:  Table [dbo].[account]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[account](
	[username] [varchar](255) NOT NULL,
	[password] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart_item]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart_item](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NOT NULL,
	[customer_customer_id] [int] NULL,
	[product_product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
 CONSTRAINT [PK__category__D54EE9B45857B1C9] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_roles]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roleid] [varchar](255) NULL,
	[customer_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[customer_id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[registered_date] [date] NULL,
	[username] [nvarchar](255) NULL,
 CONSTRAINT [PK__customer__CD65CB85E520B578] PRIMARY KEY CLUSTERED 
(
	[customer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feedback]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feedback](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[comments] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_detail]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_detail](
	[order_detail_id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NULL,
	[unit_price] [float] NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[amount] [float] NOT NULL,
	[order_date] [date] NULL,
	[status] [bit] NULL,
	[customer_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[create_date] [date] NULL,
	[description] [nvarchar](255) NULL,
	[discount] [int] NULL,
	[image] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[quantity] [int] NULL,
	[status] [bit] NULL,
	[unit_price] [float] NOT NULL,
	[category_id] [int] NULL,
 CONSTRAINT [PK__product__47027DF5AF35CF9C] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 8/9/2024 10:49:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [varchar](255) NOT NULL,
	[name] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([category_id], [name]) VALUES (1, N'Váy')
INSERT [dbo].[category] ([category_id], [name]) VALUES (2, N'So Mi')
INSERT [dbo].[category] ([category_id], [name]) VALUES (3, N'Ao Dài')
SET IDENTITY_INSERT [dbo].[category] OFF
GO
SET IDENTITY_INSERT [dbo].[customer_roles] ON 

INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (2, N'USER', 1)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (71, N'USER', 2)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (72, NULL, NULL)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (73, NULL, NULL)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (77, N'ADMIN', 2)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (78, N'ADMIN', 1)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (79, N'ADMIN', 7)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (80, N'USER', 7)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (81, N'USER', 6)
INSERT [dbo].[customer_roles] ([id], [roleid], [customer_id]) VALUES (82, NULL, NULL)
SET IDENTITY_INSERT [dbo].[customer_roles] OFF
GO
SET IDENTITY_INSERT [dbo].[customers] ON 

INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (1, N'nguyenquyet@gmail.com', N'$2a$10$gIqlvkcP6o6eNv.zSzVeaO6UrptPcNXzWtdYEIikAClo.39KMqeEi', N'0345204733', CAST(N'2023-01-01' AS Date), N'Vanquyet')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (2, N'quyet@gmail.com', N'123', N'1931313', CAST(N'2024-01-02' AS Date), N'seo')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (3, N'john.doe@example.com', N'yourPassword123', N'123-456-7890', CAST(N'2024-07-26' AS Date), N'john_doe')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (4, N'vanquyethihi@gmail.com', N'yourPassword123', N'123-456-7890', CAST(N'2024-07-26' AS Date), N'hihi')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (5, N'HIHIHIHI@gmail.com', N'1123', N'123-456-7890', CAST(N'2024-07-26' AS Date), N'CCCC')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (6, N'tukhoa@gmail.com', N'$2a$10$WQ3H.yS237D07LuH14x4Z.VoGIyvyV7A6.m.1p/HxgZNxrJrvSBfm', N'123-456-7890', CAST(N'2024-07-26' AS Date), N'lom lô')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (7, N'nguyenquyet2017zz@gmail.com', N'$2a$10$qgozSYrXggehvmOyN.RtIuMlCYrkRJ.OqD5PtS1HD.7hG51wafScC', N'123-456-7890', CAST(N'2024-07-26' AS Date), N'vanquyet')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (8, N'seo@gmail.com', N'123', N'03452047331', CAST(N'2024-08-06' AS Date), N'admin')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (9, N'seo@gmail.com', N'123', N'03452047331', CAST(N'2024-08-06' AS Date), N'admin11')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (10, N'nguyenquyet@gmail.com', N'123', N'1121212', CAST(N'2024-08-06' AS Date), N'nguyenvanquyet')
INSERT [dbo].[customers] ([customer_id], [email], [password], [phone], [registered_date], [username]) VALUES (11, N'nguyequyet2017zz@gmail.com', N'12311111', N'0345204799', CAST(N'2024-08-06' AS Date), N'poly')
SET IDENTITY_INSERT [dbo].[customers] OFF
GO
SET IDENTITY_INSERT [dbo].[order_detail] ON 

INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (1, 12, 890000, 2, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (2, 5, 389999, 3, 1)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (3, 12, 890000, 4, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (4, 1, 790000, 5, 4)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (5, 3, 890000, 6, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (6, 2, 10, 7, 10)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (8, 3, 890000, 9, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (11, 1, 890000, 12, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (12, 2, 790000, 13, 4)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (13, 12, 890000, 14, 3)
INSERT [dbo].[order_detail] ([order_detail_id], [quantity], [unit_price], [order_id], [product_id]) VALUES (14, 3, 890000, 15, 3)
SET IDENTITY_INSERT [dbo].[order_detail] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (1, 200000, CAST(N'2024-04-04' AS Date), 0, 1)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (2, 10680000, CAST(N'2024-08-07' AS Date), 0, 6)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (3, 1949995, CAST(N'2024-08-07' AS Date), 0, 6)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (4, 10680000, CAST(N'2024-08-08' AS Date), 0, 6)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (5, 790000, CAST(N'2024-08-08' AS Date), 0, 6)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (6, 2670000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (7, 20, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (8, 9812000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (9, 2670000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (12, 890000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (13, 1580000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (14, 10680000, CAST(N'2024-08-08' AS Date), 0, 7)
INSERT [dbo].[orders] ([order_id], [amount], [order_date], [status], [customer_id]) VALUES (15, 2670000, CAST(N'2024-08-08' AS Date), 0, 7)
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[product] ON 

INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (1, CAST(N'2021-01-01' AS Date), N'vay dep', 10, N'vay6.jpeg', N'Váy', 10, 1, 389999, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (3, CAST(N'2024-07-22' AS Date), N's?n ph?m váy xòe d?p', 20, N'vay2.jpg', N'Váy xòe', 10, 1, 890000, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (4, CAST(N'2024-07-22' AS Date), N's?n ph?m d?p so mj màu den', 10, N'somi11.png', N'So mi', 10, 1, 790000, 2)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (5, CAST(N'2024-07-23' AS Date), N's?n ph?m ch?t lu?ng', 20, N'somi4.webp', N'So mi Trắng', 10, 1, 982000, 2)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (6, CAST(N'2024-08-03' AS Date), N'S?n ph?m n?i d?a du?c s?n xu?t d?p', 20, N'somi9.jpg', N'So mi màu sám', 20, 1, 282999, 2)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (9, CAST(N'2024-08-03' AS Date), N's?n ph?m màu tr?ng phù h?p v?i mô t?', 10, N'vay5.jpg', N'Váy trắng', 20, 1, 892000, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (10, CAST(N'2024-08-03' AS Date), N'S?n ph?m váy màu nâu d?p', 10, N'vay4.jpeg', N'Váy Màu nâu', 10, 1, 10, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (11, CAST(N'2024-08-03' AS Date), N'S?n ph?m xu?t x? vi?t nam', 10, N'aolen.jpg', N'áo So mi cà vạt', 20, 1, 290000, 2)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (12, CAST(N'2024-08-03' AS Date), N'So mi xanh màu d?p', 10, N'somixanh.jpg', N'So mi xanh màu đẹp', 10, 1, 10, 2)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (13, CAST(N'2024-08-08' AS Date), N'Mẫu quần mang lại sự thoải mái được nhiều quý cô sành điệu không thua kém các mẫu váy hot trend đồng thời tôn lên vẻ đẹp cơ thể thật mạnh mẽ, năng động, trẻ trung.', 17, N'congso1.webp', N' Quần công sở vải tuyp xy dáng suông', 14, 1, 790200, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (14, CAST(N'2024-08-08' AS Date), N'Làm nàng nổi bật nét đẹp, ấn tượng giữa đám đông.nbsp; Chất liệu:Lụa phi cát - 100% Polyester', 28, N'congso4.webp', N'Áo kiểu dạo phố vải lụa phi cát dáng croptop cổ V xoắn ngực', 35, 1, 389000, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (15, CAST(N'2024-08-08' AS Date), N'Mẫu áo là thiết kế độc quyền của Pantio. mang đến cho nàng sự chỉn chu chuyên nghịệp mà không mất đi nét nữ tính, thời thượng', 25, N'congso2.webp', N'- Áo sơ mi công sở vải tơ dáng suông cổ đức thân phối bèo xoắn tạo kiểu', 12, 1, 452000, 1)
INSERT [dbo].[product] ([product_id], [create_date], [description], [discount], [image], [name], [quantity], [status], [unit_price], [category_id]) VALUES (16, CAST(N'2024-08-08' AS Date), N'trẻ trung cho người mặc. Diện sản phẩm này các nàng sẽ toát lên vẻ đẹp nữ tính, thướt tha và vô cùng phá cách', 34, N'congso3.webp', N' Chân váy công sở vải tuytsi dáng bút chì ', 45, 1, 674999, 1)
SET IDENTITY_INSERT [dbo].[product] OFF
GO
INSERT [dbo].[roles] ([id], [name]) VALUES (N'ADMIN', N'ngu?i qu?n lý')
INSERT [dbo].[roles] ([id], [name]) VALUES (N'USER', N'Khách hàng')
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD  CONSTRAINT [FKeeyxwpmva18pjn71hluqm6fk] FOREIGN KEY([customer_customer_id])
REFERENCES [dbo].[customers] ([customer_id])
GO
ALTER TABLE [dbo].[cart_item] CHECK CONSTRAINT [FKeeyxwpmva18pjn71hluqm6fk]
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD  CONSTRAINT [FKf67ig6902so02qgbxfiufjmid] FOREIGN KEY([product_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[cart_item] CHECK CONSTRAINT [FKf67ig6902so02qgbxfiufjmid]
GO
ALTER TABLE [dbo].[customer_roles]  WITH CHECK ADD  CONSTRAINT [FK9fknq7s3lb92u1pbt1yxtsheh] FOREIGN KEY([roleid])
REFERENCES [dbo].[roles] ([id])
GO
ALTER TABLE [dbo].[customer_roles] CHECK CONSTRAINT [FK9fknq7s3lb92u1pbt1yxtsheh]
GO
ALTER TABLE [dbo].[customer_roles]  WITH CHECK ADD  CONSTRAINT [FKgee5mori29s8ae8hwcl23qxf0] FOREIGN KEY([customer_id])
REFERENCES [dbo].[customers] ([customer_id])
GO
ALTER TABLE [dbo].[customer_roles] CHECK CONSTRAINT [FKgee5mori29s8ae8hwcl23qxf0]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKb8bg2bkty0oksa3wiq5mp5qnc] FOREIGN KEY([product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKb8bg2bkty0oksa3wiq5mp5qnc]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKrws2q0si6oyd6il8gqe2aennc] FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKrws2q0si6oyd6il8gqe2aennc]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FKpxtb8awmi0dk6smoh2vp1litg] FOREIGN KEY([customer_id])
REFERENCES [dbo].[customers] ([customer_id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FKpxtb8awmi0dk6smoh2vp1litg]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FK1mtsbur82frn64de7balymq9s] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FK1mtsbur82frn64de7balymq9s]
GO
USE [master]
GO
ALTER DATABASE [WebFashion] SET  READ_WRITE 
GO
