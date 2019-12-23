export function detectCollision(ball, gameObject) {
  let topofball = ball.position.y;
  let bottomofball = ball.position.y + 16;
  let leftofball = ball.position.x;
  let rightofball = ball.position.x + 16;
  let rightofobject = gameObject.position.x + gameObject.width;
  let leftofobject = gameObject.position.x;
  let topofobject = gameObject.position.y;
  let bottomofobject = gameObject.position.y + gameObject.height;

  if (
    topofball <= bottomofobject &&
    bottomofball >= topofobject &&
    leftofball >= leftofobject &&
    rightofball <= rightofobject
  ) {
    return true;
  } else {
    return false;
  }
}
