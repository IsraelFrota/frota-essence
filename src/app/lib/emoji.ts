
export function emoji(name: string) {
	
	if (!name) {
		return "";
	}

	switch (name) {
		case "Like":
			return "👍";
		case "Love":
			return "❤️";
		case "Haha":
			return "😂";
		case "Wow":
			return "😮";
		case "Sad":
			return "🥺";
		case "Angry":
			return "😡";  
	}

}