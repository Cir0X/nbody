#include <math.h>
#include <vector>

class Vector {
private:
  double x, y, z;

public:
  constexpr explicit Vector(double x, double y, double z) : x{x}, y{y}, z{z} {}

  double mod() const { return sqrt(x * x + y * y + z * z); }

  constexpr Vector operator+(const Vector &v) const {
    return Vector(x + v.x, y + v.y, z + v.z);
  }

  constexpr Vector operator-(const Vector &v) const {
    return Vector(x - v.x, y - v.y, z - v.z);
  }

  constexpr Vector operator*(double s) const {
    return Vector(x * s, y * s, z * s);
  }

  constexpr bool operator==(const Vector &v) const {
    return x == v.x && y == v.y && z == v.z;
  }
};

class Planet {
public:
  double mass;
  Vector position;
  Vector velocity;
  Vector acceleration;

  constexpr explicit Planet(double mass, Vector position, Vector velocity,
                            Vector acceleration)
      : mass{mass}, position{position}, velocity{velocity}, acceleration{
                                                                acceleration} {}
};

class SolarSystem {
private:
  std::vector<Planet> planets;
  Vector origin;
  std::size_t n;

public:
  SolarSystem(std::vector<Planet> planets, Vector origin)
      : planets{planets}, origin{origin}, n{planets.size()} {}

  void computeAccelerations() {
    auto gc = 150;
    for (size_t i = 0; i < n; ++i) {
      planets[i].acceleration = origin;
      for (size_t j = 0; j < n; ++j) {
        auto tmp = planets[j].mass /
                   pow((planets[i].position - planets[j].position).mod(), 3);
        auto a =
            planets[i].acceleration + planets[j].position - planets[i].position;
        planets[i].acceleration = a * tmp;
      }
    }
  }

  void computePositions() {
    for (size_t i = 0; i < n; ++i) {
      planets[i].position = planets[i].position + planets[i].velocity +
                            planets[i].acceleration * 0.5;
    }
  }

  void computeVelocities() {
    for (size_t i = 0; i < n; ++i) {
      planets[i].velocity = planets[i].velocity + planets[i].acceleration;
    }
  }

  void resolveCollisions() {
    for (size_t i = 0; i < n; ++i) {
      for (size_t j = 0; j < n; ++j) {
        if (planets[i].position == planets[j].position) {
          auto tmp = planets[i].velocity;
          planets[i].velocity = planets[j].velocity;
          planets[j].velocity = tmp;
        }
      }
    }
  }

  void tick() {
    computeAccelerations();
    computePositions();
    computeVelocities();
    resolveCollisions();
  }
};

const Vector ORIGIN{1.0, 1.0, 1.0};

std::vector<Planet> generatePlanets(size_t n) {
  std::vector<Planet> planets;
  for (size_t i = 0; i < n; ++i) {
    double di = (double)i;
    double startMass = di;
    Vector startVelocity{di, di, di};
    Vector startAcceleration{di, di, di};
    Planet planet{startMass, ORIGIN, startVelocity, startAcceleration};

    planets.push_back(planet);
  }
  return planets;
}

extern "C" {
void simulate(size_t n, size_t runs) {
  std::vector<Planet> planets{generatePlanets(n)};
  SolarSystem solarSystem{planets, ORIGIN};

  for (auto i = 0; i < runs; ++i) {
    solarSystem.tick();
  }
}
}
