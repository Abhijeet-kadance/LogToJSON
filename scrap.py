from bs4 import BeautifulSoup
import requests
url = "https://www.tutorialspoint.com/index.htm"
req = requests.get(url)
soup = BeautifulSoup(req.text, "html.parser")
print(soup.title.string)
# for link in soup.find_all('a'):
#     print(link.get('href'))

# Get the whole body tag
tag = soup.body
output = ""

# Print each string recursively
for string in tag.strings:
    file1 = open("myfile.txt", "a",encoding="utf-8")
    if not string.isspace():
            file1.write(string.strip())
    file1.close()
    
    print(string)
    
