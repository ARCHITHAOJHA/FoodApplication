# Foodzz API Test Script
# This script tests all major endpoints

$baseUrl = "https://localhost:5454"
$customerJwt = ""
$ownerJwt = ""
$restaurantId = ""
$foodId = ""
$orderId = ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "FOODZZ API Testing" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Test 1: Register Customer
Write-Host "1. Registering Customer..." -ForegroundColor Yellow
$customerBody = @{
    fullname = "Test Customer"
    email = "customer@test.com"
    password = "Password123!"
    role = "ROLE_CUSTOMER"
} | ConvertTo-Json

$customerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/signup" `
    -Method POST `
    -ContentType "application/json" `
    -Body $customerBody `
    -SkipCertificateCheck `
    -ErrorAction SilentlyContinue

if ($customerResponse.jwt) {
    $customerJwt = $customerResponse.jwt
    Write-Host "✓ Customer registered successfully" -ForegroundColor Green
    Write-Host "  JWT: $($customerJwt.Substring(0, 30))..." -ForegroundColor Gray
} else {
    Write-Host "✗ Failed to register customer" -ForegroundColor Red
    Write-Host "  Response: $customerResponse" -ForegroundColor Red
}

Write-Host ""

# Test 2: Register Owner
Write-Host "2. Registering Restaurant Owner..." -ForegroundColor Yellow
$ownerBody = @{
    fullname = "Test Owner"
    email = "owner@test.com"
    password = "Password123!"
    role = "ROLE_RESTAURANT_OWNER"
} | ConvertTo-Json

$ownerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/signup" `
    -Method POST `
    -ContentType "application/json" `
    -Body $ownerBody `
    -SkipCertificateCheck `
    -ErrorAction SilentlyContinue

if ($ownerResponse.jwt) {
    $ownerJwt = $ownerResponse.jwt
    Write-Host "✓ Owner registered successfully" -ForegroundColor Green
    Write-Host "  JWT: $($ownerJwt.Substring(0, 30))..." -ForegroundColor Gray
} else {
    Write-Host "✗ Failed to register owner" -ForegroundColor Red
}

Write-Host ""

# Test 3: Get All Restaurants (Public)
Write-Host "3. Getting All Restaurants (Public)..." -ForegroundColor Yellow
try {
    $restaurantsResponse = Invoke-RestMethod -Uri "$baseUrl/api/restaurants" `
        -Method GET `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    Write-Host "✓ Retrieved restaurants" -ForegroundColor Green
    Write-Host "  Count: $($restaurantsResponse.Count)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get restaurants" -ForegroundColor Red
}

Write-Host ""

# Test 4: Get User Profile
Write-Host "4. Getting Customer Profile..." -ForegroundColor Yellow
try {
    $profileResponse = Invoke-RestMethod -Uri "$baseUrl/api/users/profile" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $customerJwt"} `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    Write-Host "✓ Retrieved profile" -ForegroundColor Green
    Write-Host "  Email: $($profileResponse.email)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get profile" -ForegroundColor Red
}

Write-Host ""

# Test 5: Create Restaurant
Write-Host "5. Creating Restaurant..." -ForegroundColor Yellow
$restaurantBody = @{
    name = "Test Restaurant"
    description = "A test restaurant"
    cuisineType = "Indian"
    address = "123 Test Street"
    contactInformation = @{
        email = "rest@test.com"
        mobile = "+91-9876543210"
    }
    openingHours = "10:00 AM - 11:00 PM"
} | ConvertTo-Json

try {
    $restaurantResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/restaurants" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $ownerJwt"} `
        -Body $restaurantBody `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    $restaurantId = $restaurantResponse.id
    Write-Host "✓ Restaurant created successfully" -ForegroundColor Green
    Write-Host "  ID: $restaurantId" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to create restaurant" -ForegroundColor Red
}

Write-Host ""

# Test 6: Create Food Item
Write-Host "6. Creating Food Item..." -ForegroundColor Yellow
$foodBody = @{
    name = "Butter Chicken"
    description = "Creamy tomato sauce"
    price = 350.00
    category = "Main Course"
    images = @("https://example.com/food.jpg")
    isVegetarian = $false
    isAvailable = $true
    restaurantId = $restaurantId
} | ConvertTo-Json

try {
    $foodResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/food" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $ownerJwt"} `
        -Body $foodBody `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    $foodId = $foodResponse.id
    Write-Host "✓ Food item created successfully" -ForegroundColor Green
    Write-Host "  ID: $foodId" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to create food item" -ForegroundColor Red
}

Write-Host ""

# Test 7: Get Food Items
Write-Host "7. Getting All Food Items..." -ForegroundColor Yellow
try {
    $foodsResponse = Invoke-RestMethod -Uri "$baseUrl/api/food" `
        -Method GET `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    Write-Host "✓ Retrieved food items" -ForegroundColor Green
    Write-Host "  Count: $($foodsResponse.Count)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get food items" -ForegroundColor Red
}

Write-Host ""

# Test 8: Add to Cart
Write-Host "8. Adding Item to Cart..." -ForegroundColor Yellow
$cartBody = @{
    foodId = $foodId
    quantity = 2
} | ConvertTo-Json

try {
    $cartResponse = Invoke-RestMethod -Uri "$baseUrl/api/cart/add" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $customerJwt"} `
        -Body $cartBody `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    Write-Host "✓ Item added to cart" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to add item to cart" -ForegroundColor Red
}

Write-Host ""

# Test 9: Get Cart
Write-Host "9. Getting Cart..." -ForegroundColor Yellow
try {
    $getCartResponse = Invoke-RestMethod -Uri "$baseUrl/api/cart" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $customerJwt"} `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    Write-Host "✓ Retrieved cart" -ForegroundColor Green
    Write-Host "  Items: $($getCartResponse.item.Count)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get cart" -ForegroundColor Red
}

Write-Host ""

# Test 10: Create Order
Write-Host "10. Creating Order..." -ForegroundColor Yellow
$orderBody = @{
    restaurantId = $restaurantId
    deliveryAddress = "123 Main Street"
    paymentMethod = "RAZORPAY"
} | ConvertTo-Json

try {
    $orderResponse = Invoke-RestMethod -Uri "$baseUrl/api/order" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $customerJwt"} `
        -Body $orderBody `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    $orderId = $orderResponse.id
    Write-Host "✓ Order created successfully" -ForegroundColor Green
    Write-Host "  ID: $orderId" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to create order" -ForegroundColor Red
}

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "Test Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Customer JWT: $($customerJwt.Substring(0, 30))..." -ForegroundColor Gray
Write-Host "Owner JWT: $($ownerJwt.Substring(0, 30))..." -ForegroundColor Gray
Write-Host "Restaurant ID: $restaurantId" -ForegroundColor Gray
Write-Host "Food ID: $foodId" -ForegroundColor Gray
Write-Host "Order ID: $orderId" -ForegroundColor Gray
Write-Host ""
Write-Host "All tests completed!" -ForegroundColor Green

