const funMarshrut = () => {
  // Генерация сетки узлов или получение её извне
  const grid = generateGrid(); // Функция для генерации сетки узлов

  // Получение начальной и конечной точек из списка точек
  const pointC = grid[2]; // Точка C
  const pointM = grid[3]; // Точка M
  const pointB = grid[0]; // Точка B
  const pointA = grid[1]; // Точка A

  // Запуск алгоритма A*
  const path = astar(grid, pointA, pointB);

  // Генерация URL на основе найденного маршрута
  if (path) {
    const url = `https://yandex.ru/maps/?rtext=${formatCoordinates(
      pointA
    )}~${formatCoordinates(pointB)}~${formatCoordinates(
      pointC
    )}~${formatCoordinates(pointM)}&rtt=auto`;
    window.open(url, "_blank");
  } else {
    console.log("Маршрут не найден");
  }
};

// Генерация сетки узлов или её получение извне
function generateGrid() {
  // Здесь генерируйте вашу сетку узлов или получайте её извне
}

// Форматирование координат для URL
function formatCoordinates(node) {
  return `${node.y},${node.x}`; // Ваш формат координат
}

// Реализация алгоритма A* (оставлена без изменений)

// Класс узла
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
  }

  addNeighbors(grid) {
    const i = this.x;
    const j = this.y;
    if (i < grid.length - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < grid[i].length - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
  }
}

// Функция эвристической оценки расстояния
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Алгоритм A*
function astar(grid, start, end) {
  const openSet = [];
  const closedSet = [];

  openSet.push(start);

  while (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    const current = openSet[winner];

    if (current === end) {
      const path = [];
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return path;
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);

    const neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!closedSet.includes(neighbor)) {
        const tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  }

  return null;
}
