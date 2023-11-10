using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;


namespace Test;

public class tests
{
     [TestFixture]
    public class BoxTests
    {
        private HttpClient _httpClient;

        [SetUp]
        public void Setup()
        {
            _httpClient = new HttpClient();
        }

        [Test]
        public async Task ShouldSuccessfullyCreateBox()
        {
            var box = new Box()
            {
                typeid = 2,
                material = "wood",
                price = 2000
            };

            var response = await _httpClient.PostAsJsonAsync("http://localhost:5001/api/boxes", box);

            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var responseObject = JsonConvert.DeserializeObject<Box>(await response.Content.ReadAsStringAsync());

            responseObject.Should().NotBeNull();
            responseObject.typeid.Should().Be(box.typeid);
            responseObject.material.Should().Be(box.material);
            responseObject.price.Should().Be(box.price);
        }

        [Test]
        public async Task ShouldSuccessfullyEditBox()
        {
            var box = new Box()
            {
                typeid = 1,
                material = "Plastic",
                price = 5000
            };

            var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5001/api/boxes", box);
            createResponse.EnsureSuccessStatusCode();

            var createdBox = JsonConvert.DeserializeObject<Box>(await createResponse.Content.ReadAsStringAsync());

            createdBox.typeid = 3;
            createdBox.material = "metal";

            var editResponse = await _httpClient.PutAsJsonAsync($"http://localhost:5001/api/boxes/{createdBox.id}", createdBox);
            editResponse.EnsureSuccessStatusCode();

            var editedBox = JsonConvert.DeserializeObject<Box>(await editResponse.Content.ReadAsStringAsync());

            editedBox.Should().NotBeNull();
            editedBox.typeid.Should().Be(3);
            editedBox.material.Should().Be("metal");
            editedBox.price.Should().Be(5000);
        }

        [Test]
        public async Task ShouldSuccessfullyDeleteBox()
        {
            var box = new Box()
            {
                typeid = 1,
                material = "wood",
                price = 7000
            };

            var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5001/api/boxes", box);
            createResponse.EnsureSuccessStatusCode();

            var createdBox = JsonConvert.DeserializeObject<Box>(await createResponse.Content.ReadAsStringAsync());

            var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5001/api/boxes/{createdBox.id}");
            deleteResponse.EnsureSuccessStatusCode();

            var deletedBox = JsonConvert.DeserializeObject<Box>(await deleteResponse.Content.ReadAsStringAsync());

            deletedBox.Should().BeNull();
        }

        [Test]
        public async Task ShouldSuccessfullyReadBox()
        {
            var box = new Box()
            {
                typeid = 1,
                material = "wood",
                price = 2000
            };

            var createResponse = await _httpClient.PostAsJsonAsync("http://localhost:5001/api/boxes", box);
            createResponse.EnsureSuccessStatusCode();

            var createdBox = JsonConvert.DeserializeObject<Box>(await createResponse.Content.ReadAsStringAsync());

            var readResponse = await _httpClient.GetAsync($"http://localhost:5001/api/boxes/{createdBox.id}");
            readResponse.EnsureSuccessStatusCode();

            var readBox = JsonConvert.DeserializeObject<Box>(await readResponse.Content.ReadAsStringAsync());

            readBox.Should().NotBeNull();
            readBox.typeid.Should().Be(1);
            readBox.material.Should().Be("wood");
            readBox.price.Should().Be(2000);
        }
        

        [Test]
        public async Task ShouldFailToDeleteNonExistentBox()
        {
            // Attempt to delete a Box that doesn't exist
            var nonExistentBoxId = 9999;
            var deleteResponse = await _httpClient.DeleteAsync($"http://localhost:5001/api/boxes/{nonExistentBoxId}");

            deleteResponse.IsSuccessStatusCode.Should().BeFalse();
        }

        [Test]
        public async Task ShouldFailToReadNonExistentBox()
        {
            // Attempt to read a Box that doesn't exist
            var nonExistentBoxId = 9999;
            var readResponse = await _httpClient.GetAsync($"http://localhost:5001/api/boxes/{nonExistentBoxId}");

            readResponse.IsSuccessStatusCode.Should().BeFalse();
        }
    }
}