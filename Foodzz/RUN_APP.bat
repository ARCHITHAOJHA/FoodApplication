@echo off
REM Navigate to project directory
cd /d "C:\Users\sures\OneDrive\Desktop\Food-App\Foodzz"

REM Clean and build
echo ============================================
echo Building project with Maven...
echo ============================================
call mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo ============================================
echo Build successful! Starting application...
echo ============================================
echo.
echo Server will run on: https://localhost:5454
echo.
echo Test endpoints:
echo   - GET https://localhost:5454/api/restaurants
echo   - POST https://localhost:5454/auth/signup
echo   - POST https://localhost:5454/auth/signin
echo.
echo Press Ctrl+C to stop the server.
echo ============================================
echo.

REM Run the application
mvn spring-boot:run

pause

