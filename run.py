# from imp import reload
import uvicorn

from sources.Controllers.config import PORT

if __name__ == "__main__":
    uvicorn.run(
        "sources:app", host="0.0.0.0", port=int(PORT), reload=True, debug=True
    )  # workers=1
