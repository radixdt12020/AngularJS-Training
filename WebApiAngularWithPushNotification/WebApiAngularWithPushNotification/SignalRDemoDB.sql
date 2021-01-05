CREATE DATABASE SignalRDemoDB
GO
/****** Object:  Table [dbo].[Customer_Complaint]    Script Date: 05-01-2021 19:07:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer_Complaint](
	[ComplaintId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [varchar](10) NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Customer_Complaint] PRIMARY KEY CLUSTERED 
(
	[ComplaintId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Customer_Complaint] ON 
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (1, N'101', N'Hello 1st Cust of 101 grp.')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (2, N'101', N'Hello 2nd Cust of 101 grp.')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (3, N'102', N'Hello 1st Cust of 102 grp.')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (5, N'102', N'Hello 2nd Cust of 102 grp.....')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (6, N'103', N'1st Cust of 103 grp.')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (7, N'101', N'Hello 3rd Cust of 101 grp.')
GO
INSERT [dbo].[Customer_Complaint] ([ComplaintId], [CustomerId], [Description]) VALUES (8, N'101', N'Hello 4th Cust of 101 grp.')
GO
SET IDENTITY_INSERT [dbo].[Customer_Complaint] OFF
GO
