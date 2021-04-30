import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import GuideComponent from "./GuideComponent";
import html2canvas from "html2canvas";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import blueRoad from "../img/blueRoad.png";



const TestIndex = () => {
  const [upImg, setUpImg] = useState(); //img src user's img
  const imgRef = useRef(null); //img reference user's img
  const previewCanvasRef = useRef(null);  //cavvas reference for user interface
  const previewCanvasRef2 = useRef(null); //canvas reference for save high quality image
  const [crop, setCrop] = useState({ //user crop value
    unit: "%",
    width: 50,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null); //img src by user's crop

  const onSelectFile = (e) => { //function after user upload image
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const captureImg = () => { //return user's new frame img
    var imgArea = document.getElementById("downImg"); 
    imgArea.style.display = "block";
    window.scrollTo(0, 0);
    html2canvas(imgArea, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      scrollY: -window.scrollY,
    }).then(function (canvas) {
      var imgUrl = canvas.toDataURL("image/png", 1); //make img user can't find
      const anchor = document.createElement("a");
      anchor.download = "blueroad.png";
      anchor.href = imgUrl;
      anchor.click();
      imgArea.style.display = "none";
    });
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => { //do when user do crop
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const canvas2 = previewCanvasRef2.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    canvas2.width = crop.width * pixelRatio;
    canvas2.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSsodhothingQuality = "high";
    ctx2.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx2.imageSsodhothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    ctx2.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
      <BackGround>
        <Whole>
          <UploadButtonWrapper>
            <label for="image-upload">
                <h3>이미지 업로드</h3>
              </label>
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={onSelectFile}
              />
          </UploadButtonWrapper>
          <UploadedImage>
              {upImg ? (
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              ) : (
                <div style={{width:"300px", height:"300px", background:"white", display:"flex", alignItems:"center", textAlign:"center", marginLeft:"calc(50% - 150px)"}}>
                  <h2>이미지를 업로드 해주세요</h2>
                </div>
              )}
          </UploadedImage>
            {upImg && <GuideComponent />}
            {upImg &&
              <NewFrameImage>
                <NewImg>
                     <canvas
                        ref={previewCanvasRef}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    <RoadImage>
                      <img src={blueRoad} alt="블루로드" />
                    </RoadImage>
                </NewImg>
              </NewFrameImage>
            }
            <DownImage id="downImg">
              <DownImageFrame>
                <canvas
                        ref={previewCanvasRef2}
                        style={{
                          width: 640,
                          height: 640,
                        }}
                      /> 
                    <RoadImage>
                      <img src={blueRoad} alt="블루로드" />
                    </RoadImage>
              </DownImageFrame>
            </DownImage>
            <MarginSpace></MarginSpace>
        </Whole>
        {upImg &&
        <DownloadButton onClick={captureImg}>
          <h2>이미지 다운받기</h2>
        </DownloadButton> }
      </BackGround> 
  );
};



const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  background: #f2f2f2;
`;

const Whole = styled.div`
  width: 100%;
  height: auto;
  background: #f2f2f2;
  overflow: auto;
`;

const UploadButtonWrapper = styled.div`
  width: 100%;
  height: 58px;
  position:relative;

  label {
    all: unset;
    cursor: pointer;
    width: 150px;
    height: 39px;
    border: 1px solid #e5e5e5;
    background: #333333;
    display: flex;
    align-items: center;
    text-align: center;
    position:absolute;
    top:19px;
    margin-left: calc(50% - 75px);
    border-radius: 3px;
    border: 1px solid #e5e5e5;

    h3 {
      font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
      font-weight:500;
      font-size: 0.875rem;
      line-height: 1.25rem;
      letter-spacing: -0.015rem;
      color: white;
      margin: 0 auto;
    }
  }
`;

const UploadedImage = styled.div`
  width: 400px;
  height: auto;
  margin-left:calc(50% - 200px);
  margin-top:11px;
  display:flex;
  align-items:center;
  text-align:center;

  @media screen and (max-width:400px){
    width:calc(100vw - 32px);
    height:calc(100vw - 32px);
    margin-left:16px;
  }
  
  h2{
    margin:0 auto;
  }
  

`;

const NewFrameImage = styled.div`
  width: 282px;
  height: 282px;
  margin-left: calc(50% - 141px);
  margin-top:20px;
  position: relative;
  
  @media screen and (max-width: 400px) {
    width: 70.5vw;
    height: 70.5vw;
    margin-left:14.75vw;
  }
`;

const DownImage = styled.div`
  width:640px;
  height:640px;
  display: none;
  position: relative;
  overflow: auto;
  background: white;
`;

const DownImageFrame = styled.div`
  width:100%;
  height:100%;
  overflow:auto;
`;

const DownloadButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 100vw;
  height: 52px;
  background: #333333;
  position: fixed;
  bottom: 0px;
  border-radius: 12px 12px 0px 0px;
  display: flex;
  align-items: center;
  text-align: center;

  h2 {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
    font-weight:500;
    font-size: 1rem;
    font-style: normal;
    line-height: 1rem;
    letter-spacing: -0.015rem;
    margin: 0 auto;
    color: white;
  }

  @media screen and (max-width: 400px) {
    width: 100vw;
  }
`;

const MarginSpace = styled.div`
  width: 100%;
  height: 63px;
  background: #f2f2f2;
`;


const RoadImage = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const NewImg = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;


export default TestIndex;
