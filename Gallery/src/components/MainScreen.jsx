import React, { useState, useEffect } from "react";

function MainScreen() {
    return (
<div class="my-[0]">
            <div class="tool-main relative mt-[50px] overflow-hidden min-h-[340px] md:min-h-0 h-full md:h-[450px]  flex max-md:flex-col justify-between flex-row gap-[10px]">
                <div class="main-camera absolute top-0 left-0 w-full h-full hidden z-10">
                    <div id="cameraPreview" class=""></div>
                    <div class="camera-controls absolute bottom-4 left-0 w-full flex flex-wrap justify-center gap-4">
                        <button id="captureImageBtn" class="btn-capture bg-blue-500 text-white p-2 rounded hidden">Capture</button>
                        <button id="cancelCameraBtn" class="btn-cancel bg-red-500 text-white p-2 rounded hidden">Cancel</button>
                        <button id="switchCameraBtn" class="btn-switch bg-gray-500 text-white p-2 rounded hidden">Switch Camera</button>
                    </div>
                </div>
                <div class="tool-div flex  justify-center  items-center flex-col upload-area flex-1 rounded-[15px]  border-[3px] border-dashed border-[#E8E8E8] cursor-pointer py-[20px] max-sm:min-h-[286px] max-sm:p-[0_0_20px_0px]" id="drop-zone">
                    <div class="flex flex-col justify-center items-center relative">
                                                <input type="file" class="hidden" accept=".png, .jpg, .jpeg, .gif, .bmp, .webp, .tiff, .ico, .jfif, .webp, .tiff, .bmp, .pdf, .jif, .jfi, .tif, .svg" id="file_input" multiple="">

                        <img class="file_upload_image" src="https://www.extracttextfromimage.com/web_assets/frontend/image/tool-image.svg" alt="tool image">
                        <p class="file-upload-slogan text-center p-[10px_5px] text-[14px]">
                            Drop, Upload and Paste your file here to Extract Text from Image
                        </p>
                        <div class="flex gap-[10px] items-center ">
                            <button class="btn-primary bg-secondary hover:bg-[#FF6C53] text-[#fff] text-[14px] border-none rounded-[8px] p-[6px_10px] leading-[24px] font-[500] cursor-pointer flex justify-center items-center gap-[10px] brows-btn">
                                <p class="">Browse File</p>
                                <img src="https://www.extracttextfromimage.com/web_assets/frontend/image/tool-plus.svg" width="13px" alt="add-icon">
                            </button>
                            <button id="capture-btn" class="btn-link-new border-[1px] border-secondary p-[8px_10px] rounded-[8px] cursor-pointer hover:bg-secondary hover:text-[#fff]">
                                <img class="image-link" src="https://www.extracttextfromimage.com/web_assets/frontend/image/camera.svg" alt="camera-icon">
                            </button>
                            <button class="btn-link-new border-[1px] border-secondary p-[8px_10px] rounded-[8px] cursor-pointer hover:bg-secondary hover:text-[#fff]" id="link-tool">
                                <img class="image-link" src="https://www.extracttextfromimage.com/web_assets/frontend/image/link-icon.svg?v=4.2" alt="link-icon">
                            </button>
                        </div>
                        <div class="input-link-container h-[30px]">
                            <div dir="ltr" id="input-link" class="input-link border-[1px] border-secondary rounded-[8px] p-[5px_0px_4px_4px] max-w-[250px] flex justify-center items-center mt-[1rem] d-none">
                                <input type="url" class="form-input outline-none px-[8px] bg-transparent" autocomplete="off" id="url-link" placeholder="https://example.com">
                                <div class="btnfetch">
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                <!-- <div class="processing-div justify-content-between d-flex align-items-start flex-column p-10 gap-20 d-none"> -->
<div class="processing-div bg-[#F9F9F9] border-[1px] border-[#E8E8E8] rounded-[16px] w-auto md:w-full flex  flex-col p-[10px] gap-[5px] d-none">
    <div class="proceed-section-header sticky top-0 bg-[#F9F9F9] box-border p-[0px_20px] flex flex-wrap gap[10px] justify-between items-center w-full">
        <p class="text-[18px] font-[700] leading-[24px] text-[#262626] m-[10px_0px]">
            Converting Files <small>(<span id="totle_files"></span>)</small>
        </p>

        <a class="text-[16px] font-[500] leading-[24px] text-[#7A7B8E] hover:text-secondary" href="javascript:void(0)" id="clearBtn">
            Clear All
        </a>
    </div>
    <div class="overflow-y-auto p-[7px] w-full h-[108px] md:h-full">
        <!-- <div class="py-10"> -->


        <div>
            <div id="files-list" class="flex flex-col gap-[10px] mb-[5px] w-full"></div>
        </div>
    </div>

    <div class="convert-btn-container relative mt-auto p-[10px_15px_0px_15px]">
        <div id="captcha" class="absolute z-[9999] top-[-30%] max-sm:top-[-20%] max-sm:left-[50%] max-sm:translate-x-[-50%]"></div>
        <div class="rootcontainer"></div>
    </div>
</div>
            </div>
        </div>

)};
export default MainScreen;