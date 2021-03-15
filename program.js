//====================================
//
//超簡単カラーピック
//Toshihide Iizuka
//
//2021/03/14
//
//====================================

//Main
const imgElement = document.querySelector('#tgt-img');
imgElement.crossOrigin = '' // デモ用に外部から画像を取得するため

let context = null;
imgElement.onload = () => {
    // canvas 要素に画像を描画
    const canvas = document.createElement('canvas');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context = canvas.getContext('2d');
    context.drawImage(imgElement,0,0, imgElement.width, imgElement.height);
    // 初期化時、画像クリック時に画像中の色情報を取得する関数を実行
    getColor();
    imgElement.addEventListener('click',e=>getColor(e.offsetX, e.offsetY));
}


function getColor(x=0,y=0){
    // canvas 中の座標を指定して該当部の色情報を取得
    const imgData = context.getImageData(x,y,1,1);
    // 取得した情報を画面に伝達
    document.querySelector('#xy-txt').innerText =`(${x},${y})`;
    document.querySelector('#rgba-txt').innerText =`rgba(${imgData.data.join(',')})`;
    document.querySelector('.cell').style.backgroundColor = `rgba(${imgData.data.join(',')})`;
}

function scan(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = function(theFile) {
        const dataURL = theFile.target.result;
            
        //画像表示
        var bg = document.getElementById("tgt-img");
        bg.src = dataURL;
    };
    fileReader.readAsDataURL(file);
}