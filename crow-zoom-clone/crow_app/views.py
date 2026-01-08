from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.http import JsonResponse
from datetime import datetime, timedelta
from .models import Room, Meeting, Contact
import json

def home(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    recent_meetings = Meeting.objects.filter(
        participants=request.user
    ).order_by('-scheduled_time')[:5]
    
    upcoming_meetings = Meeting.objects.filter(
        scheduled_time__gte=datetime.now(),
        participants=request.user
    ).order_by('scheduled_time')[:5]
    
    context = {
        'recent_meetings': recent_meetings,
        'upcoming_meetings': upcoming_meetings,
    }
    return render(request, 'home.html', context)

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def create_room(request):
    if request.method == 'POST':
        name = request.POST.get('room_name')
        room_type = request.POST.get('room_type', 'public')
        password = request.POST.get('room_password', '')
        
        room = Room.objects.create(
            name=name,
            host=request.user,
            room_type=room_type,
            password=password if password else None
        )
        messages.success(request, f'Room "{name}" created successfully!')
        return redirect('room_detail', room_id=room.id)
    return render(request, 'create_room.html')

@login_required
def room_detail(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    
    # Check if room requires password
    if room.room_type == 'private' and room.password:
        if request.method == 'POST':
            entered_password = request.POST.get('password')
            if entered_password == room.password:
                return render(request, 'room.html', {'room': room})
            else:
                messages.error(request, 'Incorrect password')
    
    return render(request, 'room.html', {'room': room})

@login_required
def calendar_view(request):
    meetings = Meeting.objects.filter(participants=request.user)
    return render(request, 'calendar.html', {'meetings': meetings})

@login_required
def contacts_view(request):
    contacts = Contact.objects.filter(user=request.user)
    return render(request, 'contacts.html', {'contacts': contacts})

@login_required
def settings_view(request):
    if request.method == 'POST':
        request.user.first_name = request.POST.get('first_name', '')
        request.user.last_name = request.POST.get('last_name', '')
        request.user.email = request.POST.get('email', '')
        request.user.save()
        messages.success(request, 'Settings updated successfully!')
    return render(request, 'settings.html')

@login_required
def ai_chatbot(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('message', '')
        
        # Simple AI responses (extend with actual AI integration)
        responses = {
            'hello': 'Hello! How can I help with your meeting today?',
            'schedule': 'You can schedule meetings from the Calendar page.',
            'create room': 'Click the "Create Room" button to start a new video room.',
            'help': 'I can help with scheduling, room creation, and meeting management.',
        }
        
        ai_response = responses.get(user_message.lower(), 
            "I'm your AI assistant. I can help you schedule meetings, create rooms, and manage your video conferences.")
        
        return JsonResponse({'response': ai_response})

def calendar_view(request):
    return render(request, 'calendar.html')    