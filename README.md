# **Vietnamese ID Card Extractor v2.0**

## **Introduction**

An web application helps us to extract information from Vietnamese chip-based ID card in a second. This application aims to reduce human typing workload and saves more time.

## **Installation**
All requirement libraries are listed in requirements.txt. You can install it by using:

``` bash
# Virtual env recommended
pip install -r requirements.txt
```
or build through **[Docker](https://www.docker.com/)** by:

```
docker build -t <app_name> .
```

## **Usage**

``` python
python run.py
```
With Docker:
```
docker run -p 8080:8080 <app_name>
```

## **Demo**
https://user-images.githubusercontent.com/65907920/197776185-da82f1e3-bc4e-41c9-9be6-95254e4c2dfa.mov

## **TODO**
- [ ] Implement eKYC features.
- [ ] Improve speed of detection (Imma update newer version of YOLO).
- [ ] Improve accuracy of text recognized.
- [ ] Improve ability to align ID card in different light conditions.
- [ ] Code Refactoring

## **Contributors**
Special thanks to [Huynh Thien Tung](https://github.com/tuilatung), [Le Thi Thanh Thanh](https://github.com/thanhthanhthile) and [Truong Minh Son](https://github.com/truongminhson) have contributed to this project. I heartly thankful to you all.
