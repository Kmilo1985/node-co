function drawPoint(ctx, y, x, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
}
function drawKeypoints(keypoints, ctx) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    console.log(`keypoint in drawkeypoints ${keypoint}`);
    const { y, x } = keypoint.position;
    drawPoint(ctx, y, x, 3);
  }
}
function drawSegment(pair1, pair2, color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(pair1.x * scale, pair1.y * scale);
  ctx.lineTo(pair2.x * scale, pair2.y * scale);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}
function drawSkeleton(keypoints, ctx, minConfidence) {
  const color = "#FFFFFF";
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoint) => {
    drawSegment(keypoint[0].position, keypoint[1].position, color, 1, ctx);
  });
}
function setUpCanvas(ctx, video) {
  canvas.width = video.width;
  canvas.height = video.height;
  ctx.clearRect(0, 0, video.width, video.height);
  ctx.save();
  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore();
}
