import { coordinates, BasicPosture, StandardVector, StandardNumber } from "../utils/types";

export function getCenter({ x, y, w, h }: BasicPosture): coordinates {
  return {
    x: x + w / 2,
    y: y + h / 2,
  };
}
export function getSymmetricCoord(center: coordinates, { x, y }: coordinates) {
  return {
    x: 2 * center.x - x,
    y: 2 * center.y - y,
  };
}

function getNewCenterPoint(newCusrorPoint: coordinates, symmetricCoord: coordinates) {
  return {
    x: (symmetricCoord.x + newCusrorPoint.x) / 2,
    y: (symmetricCoord.y + newCusrorPoint.y) / 2,
  };
}

function deg2Rad(deg: number): number {
  return (deg / 180) * Math.PI;
}

/**
 * Methods returns the rotated coordinates with given center and degree in angle
 * @param point Point to be rotated
 * @param center The circle center
 * @param deg rotating degree in angle
 */
export function rotateCoordinates(
  point: coordinates,
  center: coordinates,
  deg: number = 0,
): coordinates {
  return {
    x:
      (point.x - center.x) * Math.cos(deg2Rad(deg)) -
      (point.y - center.y) * Math.sin(deg2Rad(deg)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(deg2Rad(deg)) +
      (point.y - center.y) * Math.cos(deg2Rad(deg)) +
      center.y,
  };
}

/**
 * Projection of any dot on a specific line
 * @param slope slope of the line from center to the current active handler
 * @param center current center
 * @param cursor current cursor coordinate
 * crossover for two orthogonal lines:
 * · slope * x + b_1 = (-1 / slope) * x + b_2
 * · slope * x_center + b_1 = y_center
 * · (-1 / slope) * x_cur + b_2 = y_cur
 *
 * in short =>
 *  x = (y_cur + x_cur/ slope - y_center + slope * x_center ) / (slope + 1 / slope)
 *  y = (-1 / slope) * x + b_2
 */
function calculateProjection(
  slope: number,
  { x: x_center, y: y_center }: coordinates,
  { x: x_cur, y: y_cur }: coordinates,
): coordinates {
  if (slope === 0) {
    return { x: x_cur, y: y_center };
  } else if (Math.abs(slope) === Infinity) {
    return { x: x_center, y: y_cur };
  }
  const b_2 = y_cur + x_cur / slope;
  const x = (b_2 - y_center + slope * x_center) / (slope + 1 / slope);
  const y = (-1 / slope) * x + b_2;
  return { x, y };
}

type Vectors = { standardVector: StandardVector; symmetricVector: StandardVector };
/**
 * Determines whether handler's dragging coordinates needs to be projected to the line from center to the active handler
 * @param style the style object describes the rectangle
 * @param cursor current cursor's coordiantes
 * @param vector the active handler's standard vector with one
 * @param lockAspectRatio flag describes whether resizing action needs to be ratio-equal
 */
function switchHandlerCoordinates(
  style: BasicPosture,
  cursor: coordinates,
  vector: StandardVector,
  lockAspectRatio: boolean | undefined,
): coordinates {
  const isMiddle = vector[0] * vector[1] === 0;
  if (isMiddle || lockAspectRatio) {
    // Cursor coordinate under middle handler and ratio-locked scenario shall be projected to the line
    const center = getCenter(style);
    const rotateStandard = rotateCoordinates(
      {
        x: center.x + (style.w / 2) * vector[0],
        y: center.y + (style.h / 2) * vector[1],
      },
      center,
      style.deg,
    );
    // const slope = (Math.atan2() + (style.deg / 180) * Math.PI) % Math.PI;
    // return calculateProjection(Math.tan(slope), center, cursor);
    return calculateProjection(
      (rotateStandard.y - center.y) / (rotateStandard.x - center.x),
      center,
      cursor,
    );
  }
  return cursor;
}

/**
 * Main methods to calculate the result attribute for the rectangle after resizing
 * @param style
 * @param cursor
 * @param symmetricPoint symmetric handler's coordinate
 * @param Vectors the current active handler and its symmetric handler's standard vector array
 * @param lockAspectRatio
 */
export function calculateHandler(
  style: BasicPosture,
  cursor: coordinates,
  symmetricPoint: coordinates,
  standardVector: StandardVector,
  lockAspectRatio?: boolean,
) {
  const handlerCoordinates = switchHandlerCoordinates(
    style,
    cursor,
    standardVector,
    lockAspectRatio,
  );
  const { w, h, deg = 0 } = style
  const [sX, sY] = standardVector


  const newCenter = getNewCenterPoint(handlerCoordinates, symmetricPoint);
  const newHandler = rotateCoordinates(handlerCoordinates, newCenter, -deg);
  const newSymmetric = rotateCoordinates(symmetricPoint, newCenter, -deg);


  // -sx represents the standard number for its symmetric point 
  let newWidth =
    sX === 0
      ? w
      : -1 * sX * newSymmetric.x + sX * newHandler.x;
  let newHeight =
    sY === 0
      ? h
      : -1 * sY * newSymmetric.y + sY * newHandler.y;
  if (newWidth >= 0 && newHeight >= 0) {
    if (lockAspectRatio) {
      const ratio =
        Math.abs(newWidth - w) > Math.abs(newHeight - h)
          ? newWidth / w
          : newHeight / h;
      newWidth = ratio * w;
      newHeight = ratio * h;
    }
    return {
      x: Math.round(newCenter.x - newWidth / 2),
      y: Math.round(newCenter.y - newHeight / 2),
      w: Math.round(newWidth),
      h: Math.round(newHeight),
    };
  }
  return style;
}

/**
 * @param center
 * @param curPosition the current cursor's coordinate
 */
export function centeralRotate(center: coordinates, { x, y }: coordinates): number {
  return Math.atan2(y - center.y, x - center.x) * 180 / Math.PI
}
