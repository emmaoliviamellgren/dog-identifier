import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CLARIFAI_ACCESS_TOKEN;
const USER_ID = process.env.NEXT_PUBLIC_CLARIFAI_USER_ID;
const APP_ID = process.env.NEXT_PUBLIC_CLARIFAI_APP_ID;
const MODEL_ID = process.env.NEXT_PUBLIC_CLARIFAI_MODEL_ID;
const MODEL_VERSION_ID = process.env.NEXT_PUBLIC_CLARIFAI_MODEL_VERSION_ID;

export async function POST(req: NextRequest) {
	const { submittedImage } = await req.json();

	if (!submittedImage) {
		return NextResponse.json(
			{ error: "Image URL is required" },
			{ status: 400 }
		);
	}

	const imageOfDogUrl = submittedImage.replace(
		/^data:image\/\w+;base64,/,
		""
	);

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						base64: imageOfDogUrl,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: "Key " + ACCESS_TOKEN,
		},
		body: raw,
	};

	try {
		const response = await fetch(
			"https://api.clarifai.com/v2/models/" +
				MODEL_ID +
				"/versions/" +
				MODEL_VERSION_ID +
				"/outputs",
			requestOptions
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Clarifai API error" },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error("Error calling Clarifai:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
