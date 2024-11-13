const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="study-notion-frontend-wheat.vercel.app"><img class="logo"
					src="https://caption-yash12.s3.ap-south-1.amazonaws.com/Screenshot%202024-11-11%20153713%5B1%5D.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA34NPYLJYTKSKEWPP%2F20241113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241113T173640Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCmFwLXNvdXRoLTEiRzBFAiEApU3UGoHCM3Y14u7yFEsUyO50RD09IJhYVpJYTI4pE8ECIDH22vMHYuOPfahC42n6gnm2DyxAB22pOdEaOcDVAR4uKvECCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODE2OTQ5MjU0NzY5Igwjm6eq1byuUW8rkaMqxQI3Z8sOcsPaNSXi6WksnyS7wubUnoanoIAPvFhIAjVvH9VhlBWXsqx6rMwhCd2secw9G6ewKKlTPByZLaVc%2BaBTYpZXc6zBmxKuEcQGPfPZRqJnKPEIU4ZL2gVqc8ZFIlPG7R4Rk18Alf0k6YDPQcwQlxXSEcVafHwWs8n5Yi%2FpAIKBcxvuTOPGYk1WQnTSd%2BaN1dbiTedeUttEhufZjYLEW%2B4oPI%2BRuCre7hO1zSJGb1s54Ka0FojjaBIrwR30X3SfZUVGPV%2Fb0hQR%2FKcuYA%2F2XJqWT6DebTOjV7wHCpiunc6W0wbjNoTYBBGDWbp0pDYLpgHlUX%2FSkP8K3CL1aVQ0XkiHm73L0EbJbC3sjn6qTNjBwiYyKMwLysz%2Fj0rW912%2FPvcDlVI%2BZdK2VclvIkwM22ZcV2K32zGEweNrwAltf6vTD6mKMMTG07kGOrMC%2BfT8L%2Bui6cmQOcigeox4cBsUvilakD4r%2BzqkdDNPofRBXQacL7IIKKp%2Ba0D8ddy%2BvGdRv%2BhUqRK14%2B%2BOkSBaFRn%2BQFU1KwD4BFV9xDMLcN%2FjA6dF0nxUtLvGvHDvF3Ksmi%2F5v8knOUxWBmCe7U0%2BJrEbIcfawSdMkzznKJ7Q3Yv5ZQXT2tqJmJOGA%2Fpd8j%2BexlUByi3Am5zQg1FlDH8iCG6GIbA%2B3onZHM54zV%2BceSf0dpWPBNFx%2Bywa5ZulTphZPB37W8TC%2FHvVifTbc1BrEJ56QFiVgkl5Aj3%2FlLl1I9uTgBWHqNrOcrrrnfn5%2FVzJRFsibsryjTgA8Pq1%2BLDl1KN%2FovvtwQ6qZNbMTqRwjr%2FvRxcP8eKgrcg13LvpFeT1fudZYBlZ%2FUvqbCunAva9WmgKrQ%3D%3D&X-Amz-Signature=a7552372197b20705d6dcbdbc6941fff07fa4b2db5f3469a9c9d76d9a4fd7ae3&X-Amz-SignedHeaders=host&response-content-disposition=inline" alt="E-Mandi Logo"></a>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with E-Mandi. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:yaahg342@gmail.com">yaahg342@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;