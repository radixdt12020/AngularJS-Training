CREATE DATABASE ProductInventoryDB
GO
/****** Object:  Table [dbo].[TblProduct]    Script Date: 31-12-2020 16:04:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblProduct](
	[ProdId] [int] IDENTITY(1,1) NOT NULL,
	[ProdCode]  AS ('P'+right('00000'+CONVERT([varchar](10),[ProdId]),(5))),
	[ProdName] [varchar](50) NULL,
	[ProdCategory] [varchar](50) NULL,
	[ProdBrand] [varchar](50) NULL,
	[ProdColor] [varchar](50) NULL,
	[ProdPrice] [decimal](18, 2) NULL,
	[ProdInStock] [bit] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_TblProduct] PRIMARY KEY CLUSTERED 
(
	[ProdId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblUser]    Script Date: 31-12-2020 16:04:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
 CONSTRAINT [PK_TblUser] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TblProduct] ON 
GO
INSERT [dbo].[TblProduct] ([ProdId], [ProdName], [ProdCategory], [ProdBrand], [ProdColor], [ProdPrice], [ProdInStock], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate], [IsActive]) VALUES (1, N'Real Me XT', N'Electronics', N'RealMe', N'White', CAST(15000.00 AS Decimal(18, 2)), 1, N'admin', CAST(N'2020-12-30T10:35:31.237' AS DateTime), NULL, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[TblProduct] OFF
GO
SET IDENTITY_INSERT [dbo].[TblUser] ON 
GO
INSERT [dbo].[TblUser] ([UserId], [UserName], [Password]) VALUES (1, N'admin', N'admin')
GO
SET IDENTITY_INSERT [dbo].[TblUser] OFF
GO
